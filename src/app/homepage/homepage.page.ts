import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  segmentChanged(event: any) {
    if(event.detail.value === 'book'){
      this.router.navigate(['home/bookseva']);
    }
    else if (event.detail.value === 'active'){
      this.router.navigate(['home/activeseva']);
    }
    console.log('Segment changed', event.detail.value);
  }
}
