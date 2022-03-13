import { Injectable } from '@angular/core';
import { addDoc, collectionSnapshots, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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
  getServices() {
    return collectionSnapshots(collection(this.firestore, 'services'));
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
  activateSeva(id){
    return updateDoc(
      doc(this.firestore, 'bookings/' + id),
      {
        activated: true,
        activateDate: new Date(),
      }
    ).catch((err: any) => {
      console.log(err);
    });
  }
  getSevaDetails(id) {
    return getDoc(doc(this.firestore, 'bookings/'+ id)).catch((err: any) => {
      console.log(err);
      return err;
    });;
  }
}
