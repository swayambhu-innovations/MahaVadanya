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
  getDoc,
} from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Booking } from '../structures/booking.structure';
import { Seat } from '../structures/seat.structure';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  storage = getStorage();
  constructor(private fs: Firestore) { }

  getSeats() {
    return getDocs(
      query(collection(this.fs, '/seats'))
    );
  }
  editSeat(seatId: string, seat: Seat) {
    return updateDoc(doc(this.fs, 'seats/' + seatId), seat);
  }

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    // const ext = file!.name.split('.').pop();
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      // handle invalid file
      return false;
    }
  }

  async addBooking(booking: Booking) {
    await updateDoc(doc(this.fs, 'sitedata/counters'), {
      totalBookings: increment(1),
    });
    return addDoc(collection(this.fs, 'bookings'), booking);
  }

  getUser(id: string) {
    return getDoc(doc(this.fs, 'users/' + id));
  }
}
