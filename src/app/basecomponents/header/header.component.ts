import { Component, OnInit } from '@angular/core';
import { AuthencationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthencationService) { }

  ngOnInit() {}
  doLogout(){
    this.authService.logout().then(
    );
  }

}
