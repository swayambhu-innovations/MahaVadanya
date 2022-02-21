import { map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksevaService } from 'src/app/Services/bookseva.service';

@Component({
  selector: 'app-bookseva',
  templateUrl: './bookseva.page.html',
  styleUrls: ['./bookseva.page.scss'],
})
export class BooksevaPage implements OnInit, OnDestroy {
  selected: Date | null;
  sevaList: any = [];
  slotList: any = [];
  selectedSeva: any;
  showDates = false; showTime = false; showSlots = false;
  sevaSubscribe: Subscription = Subscription.EMPTY;
  alreadyBookedDates: any = [];
  blockedSlots = [];
  fullyBookedDates: any = ['Tue Feb 15 2022 00:00:00 GMT+0530 (India Standard Time)'];
  constructor(private bookSeva: BooksevaService) {
    this.getBookings();
   }

  ngOnInit() {
    this.loadSevas();
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
    this.blockedSlots = [];
    //console.log('selected',this.selected);
    this.showTime = true; this.showSlots = true;
    this.alreadyBookedDates.filter(dates => {
      //console.log(dates.dateOfSeva.toLocaleDateString(), this.selected.toLocaleDateString());
      if(dates.dateOfSeva.toLocaleDateString() === this.selected.toLocaleDateString()){
        //console.log('booked slots',dates.selectedSlot);
        this.blockedSlots.push(dates.selectedSlot);
        this.slotList.filter(x => x.id === dates.selectedSlot?.id).map(x => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          //console.log(x);
          x.status = false;
        });
        //console.log('test',this.slotList);
      }else {
        this.loadSlots();
      }
    });
  }
  onSevaSelect(){
    if(this.selectedSeva){
      console.log(this.selectedSeva);
      this.getBookings();
      this.showDates = true;
    }
  }
  getBookings(){
    this.bookSeva.getBookingList().subscribe(
      (res) => {
        this.alreadyBookedDates = [];
        this.fullyBookedDates = [];
        console.log('res',res);
        res.forEach( (response) => {
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
          console.log('counts',count);
          if(count === 4){
            this.fullyBookedDates.push(new Date(a.dateOfSeva.toLocaleDateString()));
            console.log('date booked full',a.dateOfSeva);
            this.myHolidayFilter(a.dateOfSeva);
          }
          this.alreadyBookedDates.push(a);
          // if(a.selectedSlot.length === 5){
          //   this.fullyBookedDates = a.dateOfSeva.toDate();
          // }
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
    this.sevaSubscribe = this.bookSeva.getSlots().subscribe((res) => {
      this.slotList = [];
      res.forEach((response: any) => {
        const a = {
          id : response.id,
          name: response.data().name,
          status: response.data().status
        };
        //console.log('a',a);
        this.slotList.push(a);
      });
    });
  }
  selectSlot(slot){
    console.log(slot);
  }
  myHolidayFilter = (d: Date): boolean => {
    const time=d.toLocaleDateString();
    console.log('time',time);
    const aa = this.fullyBookedDates.filter(x=>{
      //console.log('xxx',x?.toLocaleDateString());
    });
    console.log('aa',aa);
    const day = aa;
    console.log('d',day);
    // return this.fullyBookedDates.find(x=>x===time);
    return !this.fullyBookedDates.find(x=>x===time);
  };
}
