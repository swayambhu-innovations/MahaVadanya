import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activeseva',
  templateUrl: './Inactiveseva.page.html',
  styleUrls: ['./Inactiveseva.page.scss'],
})
export class InactiveSevaPage implements OnInit {
  @Input() status = 'No Active Slot';
  @Input() sevastatus = 'D12 Slot Alreaday Booked';
  constructor() { }

  ngOnInit() {
  }

}
