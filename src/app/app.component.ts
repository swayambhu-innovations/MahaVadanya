import { Component } from '@angular/core';
import { AuthencationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthencationService ) {}
}
