import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { urls } from '../urls';
import { DataProvider } from '../../providers/data.provider'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private fs: Firestore,) { }
  
  updateUser(USER_ID: any, data: any) {
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return updateDoc(doc(this.fs, userUrl), data);
  }

  getUser(USER_ID: any) {
    const userUrl = urls.user.replace('{{USER_ID}}', USER_ID);
    return getDoc(doc(this.fs, userUrl));
  }
}

