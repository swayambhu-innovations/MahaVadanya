import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthencationService } from './services/authencation.service';
import { DatabaseService } from './services/database.service';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { DataProvider } from './providers/data.provider';
import { DataProviderService } from './services/dataProvider/data-provider.service';
import { UserService } from './services/user/user.service';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Auth, authState, User } from '@angular/fire/auth';
import { EMPTY, Observable, Subject } from 'rxjs';
import { urls } from './services/urls';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input() pannel = '';
  @Input() title: String = '';
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
  public readonly user: Observable<User | null> = EMPTY;

  public loggedInUserData: Subject<any> = new Subject();

  public userdata: any;
  constructor(
    private menu: MenuController,
    private platform: Platform,
    public databaseService: DatabaseService,
    public authService: AuthencationService,
    private router: Router,
    public dataProvider: DataProvider,
    private auth: Auth,
    public dataProviderr: DataProviderService,
    private fs: Firestore,
    private navController: NavController, 

  ) {
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

    
    if (this.auth) {
      this.user = authState(this.auth);
      this.user.subscribe((user: any) => {
        if (user) {
          this.dataProviderr.LoggedInUser = true;
          this.loggedInUserData.next(user)
          const userUrl = urls.user.replace('{{USER_ID}}', user.uid);
          docData(doc(this.fs, userUrl)).subscribe((res) => {
            this.dataProviderr.user = res;
            console.log(this.dataProviderr.user)

          })
        }
        else {
          this.dataProviderr.LoggedInUser = false;
          this.loggedInUserData.next(false)
        }
      })
    }
    else {
      // alert('loggedout')

    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  close() {
    this.menu.close();
  }


  ngOnInit() {}

  back() {
    this.navController.setDirection('back');
    const firstRoute = this.router.url;
    this.navController.pop()
    setTimeout(() => {
      console.log("navigated", firstRoute, this.router.url);
      if (firstRoute == this.router.url) {
        this.navController.navigateBack('/home/book-slots');
      }
    }, 10)
  }






  public get getUserData(): Observable<User | null> {
    console.log(this.user)
    return this.user;
  }
  logout() {
    this.close()
    this.authService.logout();
  }
}
