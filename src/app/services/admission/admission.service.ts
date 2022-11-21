import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { urls } from '../urls';



@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private fs: Firestore) { }

  addAdmission(data) {
    return addDoc(collection(this.fs, urls.admissions), data);
  }

}
