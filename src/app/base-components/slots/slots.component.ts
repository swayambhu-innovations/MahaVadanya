import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  @Input() activeslot = '';
  constructor() { }

  ngOnInit() {}

}
