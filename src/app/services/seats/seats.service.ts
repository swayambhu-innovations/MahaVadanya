import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { urls } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(private fs:Firestore) { }

  
  seats(){
    return getDocs(collection(this.fs, urls.seats))
  }

  updateSeat(SEAT_ID:any, data:any){
    const seatUrl = urls.seat.replace('{{SEAT_ID}}', SEAT_ID);
    return updateDoc(doc(this.fs, seatUrl), data);
  }
  seat(SEAT_ID:any){
    const seatUrl = urls.seat.replace('{{SEAT_ID}}', SEAT_ID);
    return getDoc(doc(this.fs, seatUrl));
  }

  addSeat(data:any){  
    return addDoc(collection(this.fs, urls.seats) ,data);
  }

  removeSeat(SEAT_ID:any){  
    const seatUrl = urls.seat.replace('{{SEAT_ID}}', SEAT_ID);
    return deleteDoc(doc(this.fs, seatUrl));
  }
}
