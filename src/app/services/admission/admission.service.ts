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

  exchangeSeatAdminLog(data){
    return addDoc(collection(this.fs, urls.exchangeSeat), data);

  }

  exchangeSeatMyUserLog(USER_ID:any ,data:any){
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return addDoc(collection(this.fs, userUrl + urls.exchangeSeat), data);    
  }

}
