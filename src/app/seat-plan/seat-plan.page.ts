import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingServiceService } from '../services/booking-service.service';
import { DatabaseService } from '../services/database.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';
import { Seat } from 'src/app/structures/seat.structure';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-plan',
  templateUrl: './seat-plan.page.html',
  styleUrls: ['./seat-plan.page.scss'],
})
export class SeatPlanPage implements OnInit {
  // @Input() buttonColor: string = "#28ba62";
  seats: Seat[];
  selected = false;
  bookedSeat: any;

  constructor(
    private databaseService: DatabaseService,
    private bookingService: BookingServiceService,
    private alertify: AlertsAndNotificationsService,
    private router: Router

  ) {}

  ngOnInit() {
    this.databaseService.getSeats().then((seats) => {
      this.seats = [];
      seats.forEach((seat) => {
        this.seats.push({ id: seat.id, ...seat.data() } as Seat);
      });
    });
  }
  async submit(seat: any) {
    if (seat.available) {
      this.bookedSeat=seat;
      this.selected = true;
    }
     else{
      this.alertify.presentToast(
        'This  Seat is not available'
      );
     }
  }
  async next(){
    console.log('jjj');
    this.bookingService.booking = {
      ...this.bookingService.booking,
      seat: this.bookedSeat,
      bookingId:this.bookedSeat.id
    };
    this.router.navigate(['/payment-mode']);

  }
}
