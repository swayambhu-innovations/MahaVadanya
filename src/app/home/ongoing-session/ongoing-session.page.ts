import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-ongoing-session',
  templateUrl: './ongoing-session.page.html',
  styleUrls: ['./ongoing-session.page.scss'],
})
export class OngoingSessionPage implements OnInit {

  isModalOpen = false;
  exchangeseat = false;
  constructor( public loadingController: LoadingController) { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async presentLoading(open: boolean) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.exchangeseat =open;
  }
  seatExchange(){
    this.isModalOpen = false;
    this.presentLoading(true);
  }
  ngOnInit() {
  }

}
