import { map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksevaService } from 'src/app/Services/bookseva.service';
import { DataProvider } from 'src/app/providers/data.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookseva',
  templateUrl: './bookseva.page.html',
  styleUrls: ['./bookseva.page.scss'],
})
export class BooksevaPage implements OnInit, OnDestroy {
  selected: Date | null;
  sevaList: any = [];
  slotList: any = [];
  selectedSeva: any ;
  selectedSlot: any;
  selectedTimings: any;
  showDates = false; showTime = false; showSlots = false;
  sevaSubscribe: Subscription = Subscription.EMPTY;
  alreadyBookedDates: any = [];
  blockedSlots = [];
  timingError: any = [];
  fullyBookedDates: any = [];
  constructor(private bookSeva: BooksevaService, private dataProvider: DataProvider, private router: Router) {
    // this.getBookings();
    this.loadSevas();
   }

  ngOnInit() {
    this.loadSlots();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sevaSubscribe.unsubscribe();
  }
  public customFormatter(value: number) {
    console.log(value);
    if(value < 12){
      return `${value}:00 AM`;
    }else if(value > 12){
      return `${value}:00 PM`;
    }else if(value === 12){
      return `${value}:00 Noon`;
    }
  }
  validateDate(){
    //this.loadSlots();
    this.blockedSlots = [];
    this.selectedSlot = [];
    console.log('selected',this.selected);
    console.log('test',this.slotList);
    console.log('selected',this.alreadyBookedDates);
    console.log(this.selectedSeva);
    this.showTime = true; this.showSlots = true;
    // this.alreadyBookedDates.filter(dates => {
    //   //console.log(dates.dateOfSeva.toLocaleDateString(), this.selected.toLocaleDateString());
    //   if(dates.dateOfSeva.toLocaleDateString() === this.selected.toLocaleDateString()){
    //     console.log('booked slots',dates.selectedSlot);
    //     this.blockedSlots.push(dates.selectedSlot);
    //     this.slotList.forEach((x) => {
    //      // console.log(x,'x data jere ====>>>');
    //       if(x.id === dates.selectedSlot.id && !x.status || x.status === true ){
    //         x.status = false;
    //         //x.name = 'habav';
    //         console.log('yes',x.id, dates.selectedSlot.id);
    //         // console.log('x status slot to disbale',x.name,x.status);
    //         // console.log('blockedSlots',this.blockedSlots);
    //       }else if(x.id !== dates.selectedSlot.id){
    //         x.status = true;
    //         console.log('no ',x.id, dates.selectedSlot.id);
    //       }
    //     });
    //     console.log('test',this.slotList);
    //   }else if(dates.dateOfSeva.toLocaleDateString() !== this.selected.toLocaleDateString()){
    //     this.loadSlots();
    //   }
    // });
  }
  onSevaSelect(){
    if(this.selectedSeva){
      //console.log(this.selectedSeva);
      this.getBookings();
      this.showDates = true;
    }
  }
  getBookings(){
    this.bookSeva.getBookingList(this.selectedSeva.id).then(
      (res) => {
        this.alreadyBookedDates = [];
        this.fullyBookedDates = [];
        res.forEach( (response) => {
          console.log('res ==<<>>',response.data());
          console.log(response.data().sevaDetails.id, this.selectedSeva.id);
          if(response.data().sevaDetails.id === this.selectedSeva.id){
            console.log('selected by day');
            console.log('res==>',response);
            const a: any = response.data();
            a.id = response.id;
            a.dateOfSeva = response.data().dateOfSeva.toDate();
            let count = 0;
            this.alreadyBookedDates.filter((field) => {
              console.log(field.dateOfSeva.toLocaleDateString(),new Date(response.data().dateOfSeva.toDate()).toLocaleDateString());
              if(field.dateOfSeva.toLocaleDateString() === response.data().dateOfSeva.toDate().toLocaleDateString()){
                console.log('date matched');
                count = count + 1;
              }
            });
            // console.log('counts',count);
            if(count === 4){
              this.fullyBookedDates.push(new Date(a.dateOfSeva.toLocaleDateString()));
              console.log('date booked full',a.dateOfSeva);
              this.myHolidayFilter(a.dateOfSeva);
            }
            this.alreadyBookedDates.push(a);
            // if(a.selectedSlot.length === 5){
            //   this.fullyBookedDates = a.dateOfSeva.toDate();
            // }
          }
          console.log(this.alreadyBookedDates);
          console.log('fullyBookedDates',this.fullyBookedDates);
        });
        console.log('res',this.alreadyBookedDates);
      }
    );
  }
  loadSevas(){
    this.sevaSubscribe = this.bookSeva.getSevaList().subscribe((res) => {
      this.sevaList = [];
      res.forEach((response: any) => {
        const a = {
          id : response.id,
          name: response.data().name,
          description: response.data().description,
          duration: response.data().duration,
        };
        this.sevaList.push(a);
      });
    });
  }
  loadSlots(){
    this.bookSeva.getSlots().then((res) => {
      this.slotList = [];
      res.forEach((response: any) => {
        const a = {
          id : response.id,
          name: response.data().name
        };
        //console.log('a',a);
        this.slotList.push(a);
      });
    });
  }
  selectSlot(slot){
    console.log(slot);
    this.selectedSlot = slot;
  }
  myHolidayFilter = (d: Date): boolean => {
    const time=d.toLocaleDateString();
    //console.log('time',time);
    const aa = this.fullyBookedDates.filter(x=>{
      //console.log('xxx',x?.toLocaleDateString());
    });
    //console.log('aa',aa);
    const day = aa;
    //console.log('d',day);
    // return this.fullyBookedDates.find(x=>x===time);
    return !this.fullyBookedDates.find(x=>x===time);
  };
  bookSevaHandler(){
    const timevalid = this.checkTiming();
    if(timevalid){
      const a = {
        sevaDetails: this.selectedSeva,
        dateOfSeva: this.selected,
        selectedSlot: {
          id: this.selectedSlot.id,
          name: this.selectedSlot.name
        },
        name: this.dataProvider.userData?.displayName,
        email: this.dataProvider.userData?.email,
        startTime: this.selectedTimings.lower,
        endTime: this.selectedTimings.upper,
        addedDate: new Date()
      };
      //console.log('userdaa',this.selectedTimings);
      console.log('seva nbook', a);
      if(a){
        this.bookSeva.addBooking(a).then(
          (res: any) => {
            console.log('this is add res',res);
            this.router.navigateByUrl(`/home/inactiveseva/${res.id}`);
          }
        );
      }
    }
  }
  checkTiming(){
    if(this.selectedTimings === undefined){
      this.timingError.active = true;
      this.timingError.msg = 'Please select time for Seva.';
      return false;
    }else {
      this.timingError.active = false;
      this.timingError.msg = '';
      return true;
    }
  }
  checkIsDisabled(id){
    return this.alreadyBookedDates.some(e => e.selectedSlot.id === id && e.dateOfSeva.toLocaleDateString() === this.selected.toLocaleDateString());
  }
}
