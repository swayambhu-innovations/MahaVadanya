import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Seat } from 'src/app/structures/seat.structure';
@Component({
  selector: 'app-ongoing-session',
  templateUrl: './ongoing-session.page.html',
  styleUrls: ['./ongoing-session.page.scss'],
})
export class OngoingSessionPage implements OnInit {
  isModalOpen = false;
  exchangeSeat = false;
  availableSeats: Seat[];
  exchangeSeatNumber: any;
  seatExchangeForm: UntypedFormGroup = new UntypedFormGroup({
    seat: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    public loadingController: LoadingController,
    private databaseService: DatabaseService
  ) {}
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async presentLoading(open: boolean) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.exchangeSeat = open;
  }
  seatExchange() {
    this.isModalOpen = false;
    this.presentLoading(true);
  }

  ngOnInit() {
    this.databaseService.getSeats().then((data) => {
      this.availableSeats = [];
      data.forEach((doc) => {
        if (doc.data()?.available === true) {
          this.availableSeats.push({ id: doc.id, ...doc.data() } as Seat);
          console.log(this.availableSeats);
        }
      });
    });
  }
  async submit() {
    this.exchangeSeatNumber=this.seatExchangeForm.value.seat.seatNumber;
    console.log(this.seatExchangeForm.value.seat);

   const seat={
      seatNumber: this.seatExchangeForm.value.seat.seatNumber,
      available: false,
    } as Seat;
    await this.databaseService.editSeat(this.seatExchangeForm.value?.seat.id, seat);
  }
}
