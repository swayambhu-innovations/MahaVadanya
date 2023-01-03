import { Injectable, Optional } from '@angular/core';
import {
  Firestore,
  DocumentReference,
  doc,
  getDoc,
  docData,
} from '@angular/fire/firestore';
import {
  Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithCredential,
  signInWithRedirect,
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { UserDataService } from './user-data.service';
import { DataProvider } from '../providers/data.provider';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import {
  FieldValue,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { UserStatus } from '../structures/user.structure';
import {
  Analytics,
  logEvent,
  setCurrentScreen,
  setUserProperties,
  setUserId,
} from '@angular/fire/analytics';
import { DatabaseService } from './database.service';
import { httpsCallable, Functions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class AuthencationService {
  userDoc: DocumentReference | undefined;
  checkerUserDoc: DocumentReference | undefined;
  allowedStatuses: string[] = ['active', 'inactive'];
  private loggedIn: boolean = false;
  constructor(
    private auth: Auth,
    private databaseService: DatabaseService,
    private analytics: Analytics,
    private userData: UserDataService,
    private alertify: AlertsAndNotificationsService,
    private firestore: Firestore,
    private router: Router,
    private platform: Platform,
    private dataProvider: DataProvider,
    private functions: Functions
  ) {
    if (auth) {
      // GoogleAuth.signIn();
      this.user = authState(this.auth);
      this.setDataObserver(this.user);
      this.userDisposable = authState(this.auth)
        .pipe(map((u) => !!u))
        .subscribe((isLoggedIn) => {
          this.loggedIn = isLoggedIn;
          this.dataProvider.loggedIn = isLoggedIn;
        });
    } else {
      this.loggedIn = false;
    }
  }
  public createNewUser = httpsCallable(this.functions, 'createUser');
  private userServerSubscription: Subscription | undefined = undefined;
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  // Read functions start
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }
  // private async markAttendanceRecord(uid: string) {
  //   const position = await Geolocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //   });
  //   console.log(position,25.405786219197363, 82.04665038548019);
  //   if (
  //     position.coords.latitude > 25.405456518905478 &&
  //     position.coords.longitude > 82.04632513743458 &&
  //     position.coords.latitude > 25.40537278770115 &&
  //     position.coords.longitude > 82.04674295693499 &&
  //     position.coords.latitude < 25.406111159423588 &&
  //     position.coords.longitude < 82.0467081729854 &&
  //     position.coords.latitude < 25.405906929399315 &&
  //     position.coords.longitude < 82.04708383964083
  //   ) {
  //     this.setTodayAttendance(uid)
  //   } else {
  //     logEvent(this.analytics, 'Marked_Attendance_Outside');
  //     this.alertify.presentToast(
  //       'You are outside the campus. You can ask admin for attendance',
  //       'error'
  //     );
  //   }
  // }
  setTodayAttendance(uid: string) {
    getDoc(doc(this.firestore, 'users/' + uid)).then((document: any) => {
      let data = document.data();
      if (data.attendanceDate) {
        let userAttendanceDate = data.attendanceDate.toDate();
        userAttendanceDate.setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (userAttendanceDate < today) {
          logEvent(this.analytics, 'Marked_Attendance');
          updateDoc(doc(this.firestore, 'users/' + uid), {
            attendanceDate: new Date(),
            attendanceCount: increment(1),
          });
        }
      } else {
        logEvent(this.analytics, 'Marked_Attendance');
        setDoc(
          doc(this.firestore, 'users/' + uid),
          {
            attendanceDate: new Date(),
            attendanceCount: 1,
          },
          { merge: true }
        );
      }
    });
  }
  // async markAttendance(uid: string) {
  //   if (this.platform.is('capacitor')) {
  //     await Geolocation.checkPermissions().then(async (permissions) => {
  //       if (permissions.location == 'prompt') {
  //         await Geolocation.requestPermissions()
  //           .then((value: any) => {
  //             console.log('requested permissions', JSON.stringify(value));
  //             this.markAttendanceRecord(uid);
  //           })
  //           .catch(async (error) => {
  //             if (
  //               confirm(
  //                 'Your attendance will not be recorded. Please provide permission for location.'
  //               )
  //             ) {
  //               await Geolocation.requestPermissions().then((value: any) => {
  //                 console.log('errored permissions', JSON.stringify(value));
  //                 this.markAttendanceRecord(uid);
  //               });
  //             } else {
  //               this.alertify.presentToast(
  //                 'Now your attendance will not be recorded. If you want you have to enable location permission.',
  //                 'error'
  //               );
  //             }
  //           });
  //       } else if (permissions.location == 'granted') {
  //         this.alertify.presentToast('Marking attendance');
  //       } else {
  //         this.alertify.presentToast(
  //           'Provide location permission or no attendance will be recorded',
  //           'error'
  //         );
  //       }
  //     });
  //   } else {
  //     // await Geolocation.requestPermissions()
  //     this.alertify.presentToast(
  //       'You are not using app. Attendance will not be marked',
  //       'error'
  //     );
  //   }
  // }
  // markAllAttendance() {
  //   getDocs(collection(this.firestore, 'users')).then((documents: any) => {
  //     documents.forEach((user: any) => {
  //       this.markAttendance(user.id);
  //     });
  //   });
  // }
  public async signInWithGoogle() {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    if (this.platform.is('capacitor')) {
      GoogleAuth.signIn()
        .then((googleUser: any) => {
          const credential = GoogleAuthProvider.credential(
            googleUser.authentication.idToken,
            googleUser.authentication.accessToken
          );
          signInWithCredential(this.auth, credential)
            .then((credentials: UserCredential) => {
              console.log('Credentials ', credentials);
              getDoc(doc(this.firestore, 'users/' + credentials.user.uid))
                .then((userDocument: any) => {
                  if (!userDocument.exists()) {
                    logEvent(this.analytics, 'Marked_Attendance');
                    if (credentials.user.phoneNumber == null) {
                      this.userData
                        .setGoogleUserData(credentials.user, {
                          phoneNumber: '',
                        })
                        .then(() => {
                          this.router.navigate(['']);
                        });
                    } else {
                      this.userData
                        .setGoogleUserData(credentials.user, {
                          phoneNumber: credentials.user.phoneNumber || '',
                        })
                        .then(() => {
                          this.router.navigate(['']);
                        });
                    }
                  } else {
                    this.dataProvider.pageSetting.blur = false;
                    this.alertify.presentToast(
                      'Logged In.',
                      'info',
                      5000,
                      [],
                      true,
                      ''
                    );
                    this.router.navigate(['']);
                  }
                })
                .catch((error) => {
                  console.log('ErrorCatched getting data', error);
                  this.dataProvider.pageSetting.blur = false;
                  this.alertify.presentToast(
                    error.message,
                    'error',
                    5000,
                    [],
                    true,
                    ''
                  );
                });
            })
            .catch((error) => {
              console.log('ErrorCatched authorizing', error);
              this.dataProvider.pageSetting.blur = false;
              this.alertify.presentToast(
                error.message,
                'error',
                5000,
                [],
                true,
                ''
              );
            });
        })
        .catch((error) => {
          console.log('ErrorCatched', error);
          this.dataProvider.pageSetting.blur = false;
          this.alertify.presentToast(
            error.message,
            'error',
            5000,
            [],
            true,
            ''
          );
        });
    } else {
      const gauth = new GoogleAuthProvider();
      signInWithRedirect(this.auth, gauth).then(
        (credentials: UserCredential) => {
          console.log('Credentials ', credentials);
          getDoc(doc(this.firestore, 'users/' + credentials.user.uid))
            .then((userDocument: any) => {
              if (!userDocument.exists()) {
                logEvent(this.analytics, 'Marked_Attendance');
                if (credentials.user.phoneNumber == null) {
                  this.userData
                    .setGoogleUserData(credentials.user, {
                      phoneNumber: '',
                    })
                    .then(() => {
                      this.router.navigate(['']);
                    });
                } else {
                  this.userData
                    .setGoogleUserData(credentials.user, {
                      phoneNumber: credentials.user.phoneNumber || '',
                    })
                    .then(() => {
                      this.router.navigate(['']);
                    });
                }
              } else {
                this.dataProvider.pageSetting.blur = false;
                this.alertify.presentToast(
                  'Logged In.',
                  'info',
                  5000,
                  [],
                  true,
                  ''
                );
                this.router.navigate(['']);
              }
            })
            .catch((error) => {
              console.log('ErrorCatched getting data', error);
              this.dataProvider.pageSetting.blur = false;
              this.alertify.presentToast(
                error.message,
                'error',
                5000,
                [],
                true,
                ''
              );
            });
        }
      );
    }
  }
  public async loginAnonymously() {
    let data = signInAnonymously(this.auth).then(
      (credentials: UserCredential) => {}
    );
    this.router.navigate(['']);
  }

  public async loginEmailPassword(email: string, password: string) {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = await signInWithEmailAndPassword(this.auth, email, password)
      .then((credentials: UserCredential) => {
        logEvent(this.analytics, 'Logged_In');
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast(error.message, 'error', 5000);
      });
    this.dataProvider.pageSetting.blur = false;
  }
  public signUpWithEmailAndPassword(
    email: string,
    password: string,
    username: string
  ) {
    console.log('Signing Up');
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (credentials: UserCredential) => {
        logEvent(this.analytics, 'Signed_Up');
        await this.userData.setEmailUserData(credentials.user, {
          displayName: username,
          phoneNumber: '',
          photoURL: '',
        });
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/weak-password') {
          this.alertify.presentToast(
            'Password is weak.',
            'error',
            5000,
            [],
            true,
            ''
          );
        } else if (error.code === 'auth/email-already-in-use') {
          this.alertify.presentToast(
            'Email already in use.',
            'error',
            5000,
            [],
            true,
            ''
          );
        } else {
          this.alertify.presentToast(
            error.message,
            'error',
            5000,
            [],
            true,
            ''
          );
        }
      });
  }
  // Sign in functions end
  // Sign out functions start
  public async logout() {
    if (confirm('Are you sure you want to logout?')) {
      await signOut(this.auth);
      logEvent(this.analytics, 'Logged_Out');
      this.router.navigate(['../login']);
    }
  }

  private async setDataObserver(user: Observable<User | null>) {
    // console.log('Starting data observer')
    if (user) {
      // console.log('Setting data observer')
      user.subscribe(async (u: User) => {
        if (u) {
          this.dataProvider.loggedIn = true;
          this.dataProvider.gettingUserData = true;
          // console.log('User is Logged In')
          // this.markAttendance(u.uid);
          this.userDoc = doc(this.firestore, 'users/' + u.uid);
          // await Storage.set({
          //   key: 'auth',
          //   value: JSON.stringify(u),
          // });
          // console.log("User data from auth",u);
          if (this.userServerSubscription !== undefined) {
            this.userServerSubscription.unsubscribe();
          }
          this.userServerSubscription = docData(this.userDoc).subscribe(
            async (data: any) => {
              // console.log("Received new data",data)
              if (data) {
                if (data.status) {
                  if (!this.allowedStatuses.includes(data.status.access)) {
                    this.logout();
                  }
                } else {
                  updateDoc(doc(this.firestore, 'users/' + u.uid), {
                    status: { access: 'active', isOnline: true },
                  });
                }
                this.dataProvider.userData = data;
                // this.setMissingFields();
                this.dataProvider.gettingUserData = false;
                // await Storage.set({
                //   key: 'userData',
                //   value: JSON.stringify(data),
                // });
              }
            }
          );
        }
      });
    } else {
      if (this.userServerSubscription !== undefined) {
        this.userServerSubscription.unsubscribe();
      }
    }
  }
  setMissingFields() {
    if (!this.dataProvider.userData?.phoneNumber) {
      const res = prompt('Enter your phone number');
      if (res.length === 10) {
        setDoc(doc(this.firestore, 'users/' + this.dataProvider.userID), {
          phoneNumber: '+91' + res,
        });
      } else {
        this.alertify.presentToast('Invalid Phone Number', 'error', 5000);
      }
    }
  }
  // createNewUser(newUser:any){
  //   return (newUser)
  // }
}
const geoFenceData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [82.04677820205688, 25.406187098992433],
            [82.04637050628662, 25.405552321150648],
            [82.04677820205688, 25.405341535403377],
            [82.04722344875334, 25.405956931840397],
            [82.04677820205688, 25.406187098992433],
          ],
        ],
      },
    },
  ],
};
