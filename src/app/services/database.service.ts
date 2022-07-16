import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  query,
  updateDoc,
} from '@angular/fire/firestore';
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


}
