import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activeseva',
  templateUrl: './activeseva.page.html',
  styleUrls: ['./activeseva.page.scss'],
})
export class ActivesevaPage implements OnInit {
  @Input() status = 'No Active Slot';
  @Input() sevastatus = 'D12 Slot Alreaday Booked';
  constructor() { }

  ngOnInit() {
  }

}
