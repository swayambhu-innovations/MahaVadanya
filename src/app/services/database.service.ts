import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  query,
  updateDoc,
  increment,
  addDoc,
} from '@angular/fire/firestore';
import { Booking } from '../structures/booking.structure';
import { Seat } from '../structures/seat.structure';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fs: Firestore) { }

  getSeats() {
    return getDocs(
      query(collection(this.fs, '/seats'))
    );
  }
  editSeat(seatId: string, seat: Seat) {
    return updateDoc(doc(this.fs, 'seats/' + seatId), seat);
  }


  async addBooking(booking: Booking) {
    await updateDoc(doc(this.fs, 'sitedata/counters'), {
      totalBookings: increment(1),
    });
    return addDoc(collection(this.fs, 'bookings'), booking);
  }


}
