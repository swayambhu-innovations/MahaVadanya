import { UserDataService } from './user-data.service';
import { Injectable, Optional } from '@angular/core';
import { Firestore, collectionData, collection, DocumentReference, doc,getDoc , docData, DocumentData } from '@angular/fire/firestore';
import { Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  FacebookAuthProvider ,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataProvider } from '../providers/data.provider';
import { Router } from '@angular/router';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {
  public readonly user: Observable<User | null> = EMPTY;
  userDoc: DocumentReference | undefined;
  checkerUserDoc: DocumentReference | undefined;
  private loggedIn = false;
  private userServerSubscription: Subscription | undefined = undefined;
  private readonly userDisposable: Subscription|undefined;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private dataProvider: DataProvider, private userData: UserDataService, private alertify: AlertsAndNotificationsService) {
    if (auth) {
      this.user = authState(this.auth);
      this.setDataObserver(this.user);
      this.userDisposable = authState(this.auth).pipe(
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
        this.dataProvider.loggedIn = isLoggedIn;
      });
    } else {
      this.loggedIn = false;
    }
  }

  // Read functions start
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }
  // Read functions end
  // Sign in functions start
  public async signInWithGoogle(type: 'Login'|'Signup'){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    const data = signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (credentials: UserCredential)=>{
      // console.log(credentials);
      if (!(await getDoc(doc(this.firestore,'users/'+credentials.user.uid))).exists()){
        if (credentials.user.phoneNumber == null){
          await this.userData.setGoogleUserData(credentials.user,{phoneNumber:''});
        } else {
          await this.userData.setGoogleUserData(credentials.user,{phoneNumber:credentials.user.phoneNumber});
        }
      } else {
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast('Logging you in.','info',5000,[],true,'');
        this.router.navigate(['']);
      }
    }).catch((error)=>{
      this.dataProvider.pageSetting.blur = false;
      if (error.code === 'auth/popup-closed-by-user'){
        this.alertify.presentToast('Login cancelled.','error',5000,[],true,'');
      } else {
        this.alertify.presentToast(error.message,'error',5000,[],true,'');
      }
    });

  }

  public async loginAnonymously() {
    const data = signInAnonymously(this.auth).then((credentials: UserCredential)=>{
    });
    this.router.navigate(['']);
  }

  public async loginEmailPassword(email: string, password: string){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    const data = await signInWithEmailAndPassword(this.auth, email, password).then((credentials: UserCredential)=>{
      console.log(credentials);
      this.router.navigate(['']);
    });
    this.dataProvider.pageSetting.blur = false;
  }
  public signUpWithEmailAndPassword(email: string, password: string,username: string){
    console.log('Signing Up');
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    const data = createUserWithEmailAndPassword(this.auth, email, password).then(async (credentials: UserCredential)=>{
      await this.userData.setEmailUserData(credentials.user, {displayName:username,phoneNumber:'',photoURL:''});
    }).catch((error)=>{
      this.dataProvider.pageSetting.blur = false;
      if (error.code === 'auth/weak-password') {
        this.alertify.presentToast('Password is weak.','error',5000,[],true,'');
      } else if (error.code === 'auth/email-already-in-use') {
        this.alertify.presentToast('Email already in use.','error',5000,[],true,'');
      } else {
        this.alertify.presentToast(error.message,'error',5000,[],true,'');
      }
    });
  }
  // Sign in functions end
  // Sign out functions start
  public async logout() {
    await Storage.remove({key:'auth'});
    await Storage.remove({key:'userData'});
    await signOut(this.auth);
    this.router.navigate(['../login']);
  }
  // Sign out functions end
  async openNameDialog(){
    return await this.alertify.openEmailBasedDialog();
  }
  private async getMethod(credentials: UserCredential){
    if (credentials.user.providerId === 'firebase' && credentials.user.isAnonymous === false) {
      // TODO: register user as an email based system
      const name = await this.openNameDialog();
      this.userData.setEmailUserData(credentials.user, {displayName:name,phoneNumber:'', photoURL:''});
    } else if (credentials.user.providerId === 'google.com'){
      // TODO: register user as a google based system
    } else if (credentials.user.providerId === 'firebase' && credentials.user.isAnonymous === true) {
      // TODO: register user as an anonymous based system
    }
  }
  private async setDataObserver(user: Observable<User | null>) {
    // console.log('Starting data observer')
    if (user) {
      // console.log('Setting data observer')
      user.subscribe(async (u: User) => {
        if (u) {
          this.dataProvider.loggedIn = true;
          this.dataProvider.gettingUserData= true;
          // console.log('User is logged in')
          this.userDoc = doc(this.firestore,'users/'+u.uid);
          await Storage.set({
            key: 'auth',
            value: JSON.stringify(u)
          });
          // console.log("User data from auth",u);
          if (this.userServerSubscription !== undefined){
            this.userServerSubscription.unsubscribe();
          }
          this.userServerSubscription = docData(this.userDoc).subscribe(async (data: any) => {
            // console.log("Recieved new data",data)
            this.dataProvider.userData = data;
            this.dataProvider.gettingUserData= false;
            await Storage.set({
              key: 'userData',
              value: JSON.stringify(data),
            });
          });
        }
      });
    } else {
      if (this.userServerSubscription !== undefined){
        this.userServerSubscription.unsubscribe();
      }
    }
  }

}

