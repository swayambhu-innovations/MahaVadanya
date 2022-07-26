import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  isModalOpen = false;
  constructor(private menu: MenuController, private platform: Platform) {
    if (!this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        GoogleAuth.initialize();
        GoogleAuth.initialize({
          clientId:
            '525383161466-cr4dgb3mnfbd5gdrds6ths2gqo1jsc1e.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        });
        console.log(GoogleAuth);
      });
    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  close() {
    this.menu.close();
  }
}
