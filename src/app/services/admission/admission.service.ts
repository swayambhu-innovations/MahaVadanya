import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { urls } from '../urls';



@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private fs: Firestore) { }

  addAdmission(data) {
    return addDoc(collection(this.fs, urls.admissions), data);
  }

  session(USER_ID, data){
    const userSessionUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return addDoc(collection(this.fs, userSessionUrl + urls.session), data);
  }

  seats(){
    return getDocs(collection(this.fs, urls.seats));
  }

  plans(){
    return getDocs(collection(this.fs, urls.plans));
  }

}
