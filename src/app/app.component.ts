import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from './providers/data.provider';
import { AuthencationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthencationService, private router: Router, private dataProvider: DataProvider) {
    if (this.dataProvider.loggedIn === false) {
      this.router.navigateByUrl('/login');
    }
  }
}
