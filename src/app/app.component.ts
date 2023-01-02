import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthencationService } from './services/authencation.service';
import { DatabaseService } from './services/database.service';
import { Router } from '@angular/router';
import { DataProvider } from './providers/data.provider';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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
  constructor(
    private platform: Platform,
    public databaseService: DatabaseService,
    public authService: AuthencationService,
    private router: Router,
    public dataProvider:DataProvider
  ) {
    if (!this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
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
    
  }
  ngOnInit() {
    
  }
  logout(){
    this.close()
    this.authService.logout();
  }
}
