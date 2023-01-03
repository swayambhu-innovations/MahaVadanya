import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsAndNotificationsService {
  toastAudio = new Audio();
  toastErrorAudio = new Audio();
  constructor(
   private alertController: AlertController,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.toastAudio.src = '/assets/audio/tones/toast.mp3';
    this.toastAudio.volume = 0.4;
    this.toastAudio.load();
    this.toastErrorAudio.src = '/assets/audio/tones/error.mp3';
    this.toastErrorAudio.volume = 0.4;
    this.toastErrorAudio.load();
  }
  testFunction() {
    console.log('testFunction');
  }
  playAudio(type: 'toast' | 'errorToast') {
    if (type === 'toast') {
      if(this.platform.is('android') || this.platform.is('ios')) {
      } else {
        this.toastAudio.play();
      }
    } else if (type === 'errorToast') {
      if(this.platform.is('android') || this.platform.is('ios')) {
      } else {
        this.toastErrorAudio.play();
      }
    }
  }
  async presentToast(
    message: string,
    type?: 'info' | 'error',
    duration?: number,
    action?: any,
    sound?: boolean,
    icon?: string
  ) {
    if (!duration) {
      duration = 3000;
    }
    const toast = await this.toastController.create({
      message,
      duration,
      icon,
      buttons: action,
    });
    if (sound && type === 'info') {
      toast.present();
      this.playAudio('toast');
    } else if (sound && type === 'error') {
      toast.present();
      this.playAudio('errorToast');
    } else {
      toast.present();
    }
  }

  async openDialog(
    message?: string,
    subHeader?: string,
    title?: string,
    buttons?: any,
    inputs?: any
  ) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: title || 'Alert',
      subHeader: subHeader || 'Subtitle',
      message: message || 'This is an alert message.',
      buttons: buttons || [
        {
          text: 'Submit',
          role: 'submit',
        },
      ],
      inputs: inputs || [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    return role;
  }
}
