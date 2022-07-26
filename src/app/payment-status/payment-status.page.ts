import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from '../services/booking-service.service';
import { DatabaseService } from '../services/database.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';
import { Booking } from '../structures/booking.structure';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.page.html',
  styleUrls: ['./payment-status.page.scss'],
})
export class PaymentStatusPage implements OnInit {
  @Input() paymentStatus = 'Success';
  @Input() paymentAmount = 122;
  constructor(
    private bookingService: BookingServiceService,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private router: Router,

  ) {}

  ngOnInit() {}

  async submit() {
    if (this.paymentStatus === 'Success') {
      this.bookingService.booking.status = 'Success';
      this.bookingService.booking.paidAmount = 122;
      console.log('Success');
      const booking = {
        bookingId: this.bookingService.booking.bookingId,
        userId: this.bookingService.booking.userId,
        status: this.bookingService.booking.status,
        paidAmount: this.bookingService.booking.paidAmount,
        date: this.bookingService.booking.date,
        timeSlot: this.bookingService.booking.timeSlot,
        bookedFor: this.bookingService.booking.bookedFor,
        bookedBy: this.bookingService.booking.bookedBy,
        seatNo: this.bookingService.booking.seat.seatNo,
      } as Booking;
      this.bookingService.booking.seat.available = false;
      await this.databaseService.editSeat(
        this.bookingService.booking.bookingId,
        this.bookingService.booking.seat
      );
      await this.databaseService.addBooking(this.bookingService.booking).then((res) => {
        this.alertify.presentToast(
          'Booking Successful'
        );
        this.router.navigate(['/home']);
      }).catch((err) => {
        console.log(err);
      }
      );
    } else if (this.paymentStatus === 'Pending') {
      this.bookingService.booking.status = 'Pending';
      this.bookingService.booking.paidAmount = 122;
      await this.databaseService.addBooking(this.bookingService.booking);
    } else {
      this.paymentStatus = 'Cancelled';
      this.bookingService.booking.paidAmount = 122;
      // await this.databaseService.editSeat(this.bookedSeat.id, this.bookedSeat);

      await this.databaseService.addBooking(this.bookingService.booking);
    }
  }
}
