import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-widget',
  templateUrl: './payment-widget.component.html',
  styleUrls: ['./payment-widget.component.scss'],
})
export class PaymentWidgetComponent implements OnInit {
  @Input() src:string = 'atm-card';
  @Input() name:string = 'ATM Card';
  constructor() { }

  ngOnInit() {}

}
