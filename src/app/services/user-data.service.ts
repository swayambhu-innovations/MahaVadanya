import { Injectable } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { Firestore, addDoc, collectionData,DocumentReference, CollectionReference , collection , setDoc, doc, updateDoc, deleteDoc, docSnapshots, docData, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { ExtraLoginEmailInfo, ExtraLoginGoogleInfo } from '../structures/method.structure';
import { bloodGroup, department, designation, UserAccess, UserData } from '../structures/user.structure';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersDoc:CollectionReference;
  userDoc:DocumentReference| undefined;
  constructor(private firestore: Firestore,private router:Router ,private alertify:AlertsAndNotificationsService, private dataProvider:DataProvider) {
    this.usersDoc = collection(this.firestore,'users');
  }
  public async setGoogleUserData(user:User,userData:ExtraLoginGoogleInfo){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data:UserData = {
      userId: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL ||  this.getRandomImage(),
      phoneNumber: userData.phoneNumber,
      emailVerified:true,
      status:{access:'active',isOnline:true},
      attendanceCount:0,
      attendanceDate:new Date(),
      firstLogin:false,
      access: {
        access: 'guest',
      },
      department:{department:'godown'},
      designation:{designation:'godownInCharge'},
      bloodGroup:{bloodGroup:'Unknown'},
      currentAddress:'',
      permanentAddress:'',
      nickName:'',
    }
    this.userDoc  = doc(this.firestore,'users/'+user.uid);
    await setDoc(this.userDoc,data).then(()=>{
      this.alertify.presentToast('User data set successfully')
      this.router.navigate([''])
    });
    this.dataProvider.pageSetting.blur = false;
    this.router.navigate([''])
  }
  public async setEmailUserData(user:User,userData:ExtraLoginEmailInfo){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data:UserData = {
      userId: user.uid,
      email: user.email || '',
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || this.getRandomImage(),
      phoneNumber: userData.phoneNumber || '',
      emailVerified:true,
      firstLogin:false,
      attendanceCount:0,
      attendanceDate:new Date(),
      status:{access:'active',isOnline:true},
      access: {
        access: 'guest',
      },
      department:{department:'godown'},
      designation:{designation:'godownInCharge'},
      bloodGroup:{bloodGroup:'Unknown'},
      currentAddress:'',
      permanentAddress:'',
      nickName:'',
    }
    this.userDoc  = doc(this.firestore,'users/'+user.uid);
    await setDoc(this.userDoc,data).then(()=>{
      this.alertify.presentToast('User data set successfully')
      this.router.navigate([''])
    });
    this.dataProvider.pageSetting.blur = false;
    this.router.navigate([''])
  }
  public setCompleteUserData(user:User,role:UserAccess,name:string,phoneNumber:string,department:department,designation:designation,bloodGroup:bloodGroup,currentAddress:string,permanentAddress:string,nickName:string){
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data:UserData = {
      userId: user.uid,
      email: user.email || '',
      displayName: name,
      photoURL: this.getRandomImage(),
      phoneNumber: phoneNumber,
      emailVerified:true,
      firstLogin:false,
      attendanceCount:0,
      attendanceDate:new Date(),
      status:{access:'active',isOnline:true},
      access: role || {access:'guest'},
      department:department,
      designation:designation,
      bloodGroup:bloodGroup,
      currentAddress:currentAddress || '',
      permanentAddress:permanentAddress || '',
      nickName:nickName || '',
    }
    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        this.alertify.presentToast('Cannot create user missing fields');
        throw throwError('Cannot create user missing fields');
      }
    }
    console.log(data);
    this.userDoc  = doc(this.firestore,'users/'+user.uid);
    return setDoc(this.userDoc,data);
  }
  getRandomImage():string{
    return 'https://avatars.dicebear.com/api/gridy/' + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '.svg';
  }
}
