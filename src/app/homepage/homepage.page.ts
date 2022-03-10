import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from '../providers/data.provider';
import { BooksevaService } from '../Services/bookseva.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  sessionStated = false;
  getBookingsList: any = [];
  getUserReg: any = [];
  getNewSevas: any = [];
  mainActivitesHolder: any = [];
  constructor(private router: Router, private bookSeva: BooksevaService, private dataProvider : DataProvider) {
    this.getRecentActivities();
   }

  ngOnInit() {

  }
  segmentChanged(event: any) {
    if(event.detail.value === 'book'){
      this.router.navigate(['home/bookseva']);
    }
    else if (event.detail.value === 'inactive'){
      this.router.navigate(['home/inactiveseva/8DViEBeJeFgip2u6EJKP']);
    }
    else if (event.detail.value === 'active'){
      this.router.navigate(['home/activeseva']);
    }
    // console.log('Segment changed', event.detail.value);
  }
  getRecentActivities(){
    this.bookSeva.getAllBookingList().subscribe(
      (res) => {
        this.getBookingsList = [];
        res.forEach((data) => {
          const sevaDate = data.data().dateOfSeva.toDate().toLocaleDateString();
          const today = new Date().toLocaleDateString();
          if(sevaDate === today){
            //console.log(data.data().dateOfSeva.toDate().toLocaleDateString());
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dd = data.data().dateOfSeva.toDate().toLocaleDateString(undefined,options);
            let name = data.data().name;
            if(data.data().name === ''){
              name = 'Someone';
            }
            const a = {
              message : `${name} booked ${data.data().sevaDetails?.name} for date - ${dd}`
            };
            this.getBookingsList.push(a);
          }
        });
        //console.log('bookings ==',this.getBookingsList);
        this.mergeAllActivites();
      }
    );
    this.bookSeva.getSevaList().subscribe(
      (res) => {
        this.getNewSevas = [];
        res.forEach((data) => {
          const sevaDate = data.data().addedDate.toDate().toLocaleDateString();
          const today = new Date().toLocaleDateString();
          this.dataProvider.availabelServices.push(data.data());
          if(sevaDate === today){
            console.log(data.data().addedDate.toDate().toLocaleDateString());
            const a = {
              message : `We've Just added a new Seva - ${data.data().name}`
            };
            this.getNewSevas.push(a);
          }
        });
        console.log('sevas list===', this.getNewSevas);
        this.mergeAllActivites();
      }
    );
  }
  mergeAllActivites(){
    this.dataProvider.recentActivities = [];
    // this.mainActivitesHolder = [this.mainActivitesHolder, this.getNewSevas];
    this.getNewSevas.forEach((item) => {
      this.dataProvider.recentActivities.push(item);
    });
    this.getBookingsList.forEach((item) => {
      this.dataProvider.recentActivities.push(item);
    });
    console.log('recentActivities',this.dataProvider.recentActivities);
  }
}
