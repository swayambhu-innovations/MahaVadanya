import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AdmissionService } from 'src/app/services/admission/admission.service';
import { DatabaseService } from 'src/app/services/database.service';
import { DataProviderService } from 'src/app/services/dataProvider/data-provider.service';
import { SeatsService } from 'src/app/services/seats/seats.service';
import { Seat } from 'src/app/structures/seat.structure';
@Component({
  selector: 'app-ongoing-session',
  templateUrl: './ongoing-session.page.html',
  styleUrls: ['./ongoing-session.page.scss'],
})
export class OngoingSessionPage implements OnInit {

  seats: any = []
  public mySeat: any;
  public iWantExchangeWith: any;
  public selectedSeat: any;
  isModalOpen = false;
  mySeatID: any = this.dataProvider?.user?.currentAdmission?.seat?.id


  constructor(
    public dataProvider: DataProviderService,
    private seatService: SeatsService,
    public admissions: AdmissionService
  ) { }

  ngOnInit() {
    this.getSeat();
    console.log(this.mySeatID)
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }



  async getSeatTrigger(data) {
    this.selectedSeat = data;
    console.log(this.selectedSeat)

    let orignalSeatFields = await this.seatService.seat(this.mySeatID)
    this.mySeat = orignalSeatFields.data();

    let exchangeSeatField = await this.seatService.seat(this.selectedSeat.id)
    this.iWantExchangeWith = exchangeSeatField.data();



    // creating Id's
    const adminDocId = this.mySeat.userId + this.iWantExchangeWith.userId;
    const mySeatDocId = 'seat' + this.mySeat.userId + this.iWantExchangeWith.userId;
    const exchangeSeatId = 'exchange' + this.mySeat.userId + this.iWantExchangeWith.userId;

    console.log(adminDocId)
    console.log(mySeatDocId)
    console.log(exchangeSeatId)


    const exchangeSeatData = {
      orignalSeat: this.mySeat,
      exchangeSeat: this.iWantExchangeWith,
      adminDocId: adminDocId,
      orignalSeatId: mySeatDocId,
      exchangeSeatId: exchangeSeatId,
      status: 'pending'

    }

    this.admissions.exchangeSeatAdminLog(adminDocId, exchangeSeatData);
    // console.log(this.mySeat.userId)
    // console.log(this.iWantExchangeWith.userId)

    this.admissions.exchangeSeatMyUserLog(this.mySeat.userId, mySeatDocId, exchangeSeatData);
    this.admissions.exchangeSeatMyUserLog(this.iWantExchangeWith.userId, exchangeSeatId, exchangeSeatData);

  }

  getSeat() {
    this.admissions.seats().then((res) => {
      res.forEach((element: any) => {
        console.log(element.data())
        this.seats.push({
          ...element.data(),
          id: element.id,
        });
      });
    })
  }




  async exchangeSeat(data) {


    if (data == 'approve') {
      // console.log(data)
      const mySeatChange = this.mySeat.userId.replace(' ', '');

      try {
        let dataOne = await this.admissions.confirmUserAdmission(mySeatChange,
          {
            currentAdmission: {

              seat: {

                id: this.iWantExchangeWith.id,
                seatNo: this.iWantExchangeWith.seatNo,
              },

            }
          });

      } catch (error) {

      }

      const exchangeUserSeatChanges = this.iWantExchangeWith.userId.replace(' ', '');
      await this.admissions.confirmUserAdmission(exchangeUserSeatChanges,
        {
          currentAdmission: {
            seat: {
              id: this.mySeat.id,
              seatNo: this.mySeat.seatNo,
            },
          }
        });

      const mySeatId = this.mySeat.id.replace(' ', '');
      await this.seatService.updateSeat(mySeatId, {
        seatNo: this.iWantExchangeWith.seatNo,
        id: this.iWantExchangeWith.id

      });

      const exchangeUserSeatId = this.iWantExchangeWith.id.replace(' ', '');
      await this.seatService.updateSeat(exchangeUserSeatId, {
        seatNo: this.mySeat.seatNo,
        id: this.mySeat.id

      });


    }



  }
}
