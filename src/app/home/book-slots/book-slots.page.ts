import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { DataProvider } from 'src/app/providers/data.provider';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Booking } from 'src/app/structures/booking.structure';

@Component({
  selector: 'app-book-slots',
  templateUrl: './book-slots.page.html',
  styleUrls: ['./book-slots.page.scss'],
})
export class BookSlotsPage implements OnInit {
  bookingForm: UntypedFormGroup = new UntypedFormGroup({
    date: new UntypedFormControl('', [Validators.required]),
    timeSlot: new UntypedFormControl(null, [Validators.required]),
    bookedFor: new UntypedFormControl(null, [Validators.required]),
  });
  constructor(
    private bookingService: BookingServiceService,
    private router: Router,
    private dataProvider: DataProvider
  ) {}

  ngOnInit() {}
  async submit() {
    this.bookingForm.value.date = Timestamp.fromDate(
      new Date(this.bookingForm.get('date')?.value)
    );
    this.bookingService.booking = {
      ...this.bookingForm.value,
      userId: this.dataProvider?.userData?.userId,
      bookedBy: this.dataProvider?.userData?.displayName,
    };
    this.router.navigate(['/seat-plan']);
    console.log(this.bookingService.booking);
  }
}
