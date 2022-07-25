import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-plan',
  templateUrl: './seat-plan.page.html',
  styleUrls: ['./seat-plan.page.scss'],
})
export class SeatPlanPage implements OnInit {
  @Input() buttonColor: string = "#28ba62";

  constructor() { }

  ngOnInit() {
  }

}
