import { Component, OnInit } from '@angular/core';
import { AdmissionService } from '../services/admission/admission.service';
import { DataProviderService } from '../services/dataProvider/data-provider.service';
import { SeatsService } from '../services/seats/seats.service';

@Component({
  selector: 'app-exchange-seat',
  templateUrl: './exchange-seat.page.html',
  styleUrls: ['./exchange-seat.page.scss'],
})
export class ExchangeSeatPage implements OnInit {

  exchangeSeats: any[] = []
  constructor(private admission: AdmissionService, public dataProvider: DataProviderService, public seatService: SeatsService) { }

  ngOnInit() { this.getExchangeSeat() }

  getExchangeSeat() {
    if (this.dataProvider?.user) {
      console.log(this.dataProvider?.user)
      this.admission.getExchangeSeatMyUserLog(this.dataProvider?.user?.userId).then((res) => {
        res.forEach((element: any) => {
          this.exchangeSeats.push({
            ...element.data(),
            id: element.id,
          });
          console.log(this.exchangeSeats)
        });
      })
    }


  }


  async exchangeSeatApprove(data: any, data2:any) {

    console.log(data.id)
    for (let elem of this.exchangeSeats) {
      var exchangeData = elem;
    }

    console.log(exchangeData.exchangeSeat.fullName)
    console.log(data)
    if (data2 == 'approve') {
      // console.log(data)
      const mySeatChange = this.dataProvider.user.userId.replace(' ', '');

      const adminDocId = exchangeData.orignalSeat.userId + exchangeData.exchangeSeat.userId;
      const mySeatDocId = 'seat' + exchangeData.orignalSeat.userId + exchangeData.exchangeSeat.userId;
      const exchangeSeatId = 'exchange' + exchangeData.orignalSeat.userId + exchangeData.exchangeSeat.userId;
      console.log("new line")
      try {
        console.log("new line")
        let dataOne = await this.admission.confirmUserAdmission(mySeatChange,
          {
            currentAdmission: {

              seat: {

                id: exchangeData.exchangeSeat.id,
                seatNo: exchangeData.exchangeSeat.seatNo,
              },

            }
          });
          console.log("new line")
          const exchangeUserSeatChanges = exchangeData.exchangeSeat.userId.replace(' ', '');
          await this.admission.confirmUserAdmission(exchangeUserSeatChanges,
            {
              currentAdmission: {
                seat: {
                  id: exchangeData.orignalSeat.id,
                  seatNo: exchangeData.orignalSeat.seatNo,
                },
              }
            });
           console.log("new line")
          const mySeatId = exchangeData.orignalSeat.id.replace(' ', '');
          await this.seatService.updateSeat(mySeatId, {
            fullName: exchangeData.exchangeSeat.fullName,
            userId: exchangeData.exchangeSeat.userId
    
          });
    
          const exchangeUserSeatId = exchangeData.exchangeSeat.id.replace(' ', '');
          await this.seatService.updateSeat(exchangeUserSeatId, {
            fullName: exchangeData.orignalSeat.fullName,
            userId: exchangeData.orignalSeat.userId
    
          });
          console.log("new line")
          const exchangeSeatData = {
            status: 'approve'
          }
  
          console.log(adminDocId)
          console.log(mySeatDocId)
          console.log(exchangeSeatId)
    
          await this.admission.updateExchangeSeatAdminLog(adminDocId, exchangeSeatData);
          await this.admission.updateExchangeSeatMyUserLog(exchangeData.orignalSeat.userId, mySeatDocId, exchangeSeatData);
          await this.admission.updateExchangeSeatMyUserLog(exchangeData.exchangeSeat.userId, exchangeSeatId, exchangeSeatData);

      } catch (error) {
        console.log(error)
      }

     



    }




  }

}
