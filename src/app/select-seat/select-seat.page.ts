import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmissionService } from '../services/admission/admission.service';
import { DataProviderService } from '../services/dataProvider/data-provider.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.page.html',
  styleUrls: ['./select-seat.page.scss'],
})
export class SelectSeatPage implements OnInit {
  public selectedSeat:any;
  seats:any = []
  constructor(private admission:AdmissionService, public dataProvider:DataProviderService,private alertify: AlertsAndNotificationsService, private router:Router, private user:UserService) { }

  ngOnInit() { 
    this.getSeat()
   }

  

  getSeatTrigger(data) {
    this.selectedSeat = data;
    console.log(this.selectedSeat)
    console.log(this.dataProvider.user?.userId)
  }

  getSeat(){
    this.admission.seats().then((res)=>{
      res.forEach((element: any) => {
        this.seats.push({
          ...element.data(),
          id: element.id,
        });
      });
    })
  }

  addAdmission(){
    
    const admission = {
      ...this.dataProvider.admission,
      seat: this.selectedSeat,
      userId: this.dataProvider.user?.userId,
      status:'pending'
    }
    
    this.admission.addAdmission(admission).then((res)=>{
      this.alertify.presentToast('Registration Success');
      this.router.navigateByUrl('/admission-confirmation');
    })
  }

}
