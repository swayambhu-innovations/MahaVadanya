import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pannel = '';
  @Input() title: String = '';
  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() { }

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
}
