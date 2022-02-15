import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsAndNotificationsService {
  testFunction(){
    console.log("testFunction");
  }
  toastAudio = new Audio()
  toastErrorAudio = new Audio()
  playAudio(type:'toast'|'errorToast'){
    if (type ==='toast'){
      this.toastAudio.play();
    } else if (type ==='errorToast'){
      this.toastErrorAudio.play();
    }
  }
  async presentToast(message: string,type?: 'info'|'error', duration?: number,action?:any,sound?:boolean,icon?:string) {
    if (!duration){
      duration = 3000;
    }
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      icon:icon,
      buttons:action,
    });
    if (sound && type === 'info'){
      toast.present();
      this.playAudio('toast');
    } else if (sound && type==='error'){
      toast.present();
      this.playAudio('errorToast');
    } else {
      toast.present();
    }
  }

  async openEmailBasedDialog(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [
        {
          text:'Submit',
          role:'submit'
        }
      ],
      inputs:[
        {
          name:'name',
          type:'text',
          label:'Name',
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    return role
  }
  
  constructor(private alertController:AlertController, private toastController: ToastController) {
    this.toastAudio.src = '/assets/audio/tones/toast.mp3';
    this.toastAudio.volume = 0.4;
    this.toastAudio.load();
    this.toastErrorAudio.src = '/assets/audio/tones/error.mp3';
    this.toastErrorAudio.volume = 0.4;
    this.toastErrorAudio.load();
  }
}
