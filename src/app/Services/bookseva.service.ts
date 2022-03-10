import { Injectable } from '@angular/core';
import { addDoc, collectionSnapshots, getDocs, query, where } from '@angular/fire/firestore';
import { collection, CollectionReference, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BooksevaService {
  sevaColl: CollectionReference;
  bookingRef: CollectionReference;
  constructor(private firestore: Firestore) { }
  getSevaList() {
    return collectionSnapshots(collection(this.firestore, 'sevas'));
  }
  getSlots() {
    return getDocs(collection(this.firestore, 'slotsPerDay'));
    //return collectionSnapshots(collection(this.firestore, 'slotsPerDay'));
  }
  async getBookingList(id: any) {
    //return collectionSnapshots(collection(this.firestore, 'bookings'));
    const bookRef = collection(this.firestore, 'bookings');
    const q = query(bookRef, where('sevaDetails.id', '==', id));
    const querySnapshot = await getDocs(q);
    return querySnapshot;

  }
  getAllBookingList() {
    return collectionSnapshots(collection(this.firestore, 'bookings'));
  }
  getNewUsersList() {
    return collectionSnapshots(collection(this.firestore, 'users'));
  }
  addBooking(data: any) {
    this.bookingRef = collection(
      this.firestore,
      'bookings'
    );
    return addDoc(this.bookingRef, data);
  }
}
