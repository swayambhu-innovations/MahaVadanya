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

  seats:any = []
  public mySeat: any;
  public iWantExchangeWith: any;
  public selectedSeat: any;
  isModalOpen = false;
  mySeatID:any = this.dataProvider?.user?.currentAdmission?.seat?.id

  
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

  

  getSeatTrigger(data) {
    this.selectedSeat = data;
    console.log(this.selectedSeat)
    this.seatService.seat(this.mySeatID).then((res) => {
      this.mySeat = res.data();
      console.log(this.mySeat)
    })

    this.seatService.seat(this.selectedSeat).then((res) => {
      this.iWantExchangeWith = res.data();

    })
    const exchangeSeatData = {
      orignalSeat: {...this.mySeat},
      exchangeSeat: {...this.iWantExchangeWith},
      status:'pending'
    }
    this.admissions.exchangeSeatAdminLog(exchangeSeatData);
    this.admissions.exchangeSeatMyUserLog(this.mySeat.userId.replace(' ', '') ,exchangeSeatData);
    this.admissions.exchangeSeatMyUserLog(this.iWantExchangeWith.userId.replace(' ', '') ,exchangeSeatData);
    
  }

  getSeat(){
    this.admissions.seats().then((res)=>{
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
