import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  
  segmentValue: string = '';

  constructor(public router: Router) {}

  ngOnInit() {
    console.log(this.router.url);
  }
}