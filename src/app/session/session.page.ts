import { Component, OnInit } from '@angular/core';
import { AdmissionService } from '../services/admission/admission.service';
import { DataProviderService } from '../services/dataProvider/data-provider.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {



  public time: any

  constructor(private admissionService: AdmissionService, public userService: UserService, public dataProvider: DataProviderService) { }

  ngOnInit() {
    setInterval(() => { this.time = this.getTime(this.dataProvider?.user?.currentSessionTime) }, 1000)
  }

  getTime(date: any) {
    let milliseconds = (new Date()).getTime() - (date?.toDate().getTime());
    // convert milliseconds to minutes and seconds
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
  }

  addSession() {
    const data: any = {
      currentDate: new Date(),
      seatNo: 23,
    }
    this.admissionService.session(this.dataProvider.user.id, data).then((res) => {
      console.log(res.id);

      this.userService.updateUser(this.dataProvider?.user.uid, { currentSessionId: res.id, currentSessionTime: data.currentDate })

    })
  }

}
