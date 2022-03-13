import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { modalController } from '@ionic/core';
import { timer } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { BooksevaService } from 'src/app/Services/bookseva.service';

@Component({
  selector: 'app-activeseva1',
  templateUrl: './activeseva.page.html',
  styleUrls: ['./activeseva.page.scss'],
})
export class ActivesevaPage implements OnInit, OnDestroy {
  @Input() slot = '108';
  @Input() endtime = '12:00 am';
  @Input() sname = 'Coffee';
  duration = 0;
  progress = 0;
  remaining = 0;
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  slotId = 0;
  isSessionActive = false;
  endingTime: any;
  id: any;
  endingDate: any;
  counter = timer(0, 1000);
  public clock;
  initDate: any;
  endDate: any;
  currentDate = new Date();
  servicesList: any = [];
  isModalOpen = false;
  currentModal = null;
  constructor(public dataProvider: DataProvider, private bookSeva: BooksevaService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      console.log(params);
      console.log('params',params.id);
      this.id = params.id;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
      this.bookSeva.getSevaDetails(this.id).then(
        (res: any) => {
          console.log(res.data());
          this.duration = res.data().sevaDetails.duration;
          this.remaining = res.data().sevaDetails.duration;
          console.log(this.duration);
          this.slotId = res.data().selectedSlot.id;
          if(res.data().activated === true){
            this.isSessionActive = res.data().activated;
          }
          this.endingTime = res.data().activateDate.toDate();
          console.log(this.endingTime);
          const minutesToAdd=this.duration;
          const f = new Date(this.currentDate.getTime() + minutesToAdd*60000);
          this.endingDate = f.toLocaleTimeString('en-US');
          // this.endingDate = f.toLocaleTimeString('en-US');
          console.log('futureDate',this.endingDate);
        }
      ).catch((err) => {
        console.log('err',err);
      });
  }
  ngOnInit() {
    this.getServices();
    // const minutesToAdd=this.duration;
    // const currentDate = new Date();
    //const f = new Date(currentDate.getTime() + minutesToAdd*60000).getTime();
    const getDownloadProgress = () => {
      console.log('getDownload', this);
      if (this.progress < this.duration) {
        console.log('inside if', this.progress);
        this.progress = this.progress + 1;
        this.remaining = this.remaining - 1;
        //this.progress = new Date().getTime();
      }
      else {
        clearInterval(this.intervalId);
      }
    };
    this.intervalId = setInterval(getDownloadProgress, 60000);
    this.counter.subscribe(() => {
      this.time();
    });
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  time() {
    const date = new Date();
    let second: number | string = date.getSeconds();
    let minute: number | string = date.getMinutes();
    const hour: number | string = date.getHours();
    if (second < 10) {
      second = '0' + second;
    }
    if (minute < 0) {
      minute = '0' + minute;
    }
    this.clock = hour + ':' + minute + ':' + second;
  }
  getServices(){
    this.servicesList = [];
    this.bookSeva.getServices().subscribe(
      (res) => {
        res.forEach((item) => {
          console.log(item.data());
          this.servicesList.push(item.data());
        });
      }
    );
  }
  showSuccss(e){
    if(this.duration === e){
      console.log(e);
    }
  }
  buyService(item){
    console.log(item);
    this.openModal();
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }
  async openModal(opts = {}) {
    const modal = await modalController.create({
      component: 'modal-content',
      ...opts,
    });
    modal.present();
    this.currentModal = modal;
  }
}
