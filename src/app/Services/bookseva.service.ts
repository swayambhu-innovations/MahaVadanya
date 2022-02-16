import { Injectable } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { collection, CollectionReference, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BooksevaService {
  sevaColl: CollectionReference;
  constructor(private firestore: Firestore) { }
  getSevaList() {
    return collectionSnapshots(collection(this.firestore, 'sevas'));
  }
  getBookingList() {
    return collectionSnapshots(collection(this.firestore, 'bookings'));
  }
}
