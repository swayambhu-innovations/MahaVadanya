import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { urls } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private fs:Firestore) { }


  plan(USER_ID: any, data: any) {
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return setDoc(doc(this.fs, userUrl), data, {merge:true})
  }
}
