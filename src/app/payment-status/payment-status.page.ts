import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from '../services/booking-service.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.page.html',
  styleUrls: ['./payment-status.page.scss'],
})
export class PaymentStatusPage implements OnInit {
  status: 'Success' ;
  paidAmount: 122;
  constructor(private bookingService: BookingServiceService) { }

  ngOnInit() {
  }

  submit(){
    this.bookingService.booking.status='Success';
    this.bookingService.booking.paidAmount=122;
    console.log(this.bookingService.booking);
  }
}
