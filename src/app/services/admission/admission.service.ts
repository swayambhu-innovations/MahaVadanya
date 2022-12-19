import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { urls } from '../urls';



@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private fs: Firestore) { }

  addAdmission(data) {
    return addDoc(collection(this.fs, urls.admissions), data);
  }

  session(USER_ID, data: any) {
    const userSessionUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return addDoc(collection(this.fs, userSessionUrl + urls.session), data);
  }

  seats() {
    return getDocs(collection(this.fs, urls.seats));
  }

  plans() {
    return getDocs(collection(this.fs, urls.plans));
  }

  admissions() {
    return getDocs(collection(this.fs, urls.admissions))
  }

  admission(ADMISSION_ID: any) {
    const admissionUrl = urls.admission.replace('{{ADMISSION_ID}}', ADMISSION_ID);
    return getDoc(doc(this.fs, admissionUrl))
  }

  updateAdmission(ADMISSION_ID: any, data: any) {
    const admissionUrl = urls.admission.replace('{{ADMISSION_ID}}', ADMISSION_ID);
    return updateDoc(doc(this.fs, admissionUrl), data)
  }

  confirmUserAdmission(USER_ID: any, data: any) {
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return setDoc(doc(this.fs, userUrl), data, {merge:true})
  }

  // admin
  exchangeSeatAdminLog(SEAT_ID:any, data:any,){
    // return addDoc(collection(this.fs, urls.exchangeSeat), data);
    const exchangeSeatDocUrl = urls.exchangeSeatDoc.replace('{{SEAT_ID}}', SEAT_ID);
    return setDoc(doc(this.fs, exchangeSeatDocUrl), data, {merge:true});

  }

  // user
  exchangeSeatMyUserLog(USER_ID:any, SEAT_ID:any ,data:any){
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    const exchangeSeatDocUrl = urls.exchangeSeatDoc.replace('{{SEAT_ID}}', SEAT_ID);
    return setDoc(doc(this.fs, userUrl + exchangeSeatDocUrl), data);    
  }

// update apporve
  updateExchangeSeatAdminLog(SEAT_ID:any, data:any){
    console.log('main', urls.exchangeSeat)
    const exchangeSeatDocUrl = urls.user.replace('{{SEAT_ID}}', SEAT_ID);
    return setDoc(doc(this.fs, exchangeSeatDocUrl), data, {merge:true});
  }


  updateExchangeSeatMyUserLog(USER_ID:any, SEAT_ID:any ,data:any){
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    const exchangeSeatDocUrl = urls.user.replace('{{SEAT_ID}}', SEAT_ID);
    console.log('main2', urls.exchangeSeat);
    return setDoc(doc(this.fs, userUrl + exchangeSeatDocUrl), data ,{merge:true});    
  }

  getExchangeSeatMyUserLog(USER_ID:any ){
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return getDocs(collection(this.fs, userUrl + urls.exchangeSeat));    
  }

}
