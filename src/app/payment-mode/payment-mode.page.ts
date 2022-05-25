import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.page.html',
  styleUrls: ['./payment-mode.page.scss'],
})
export class PaymentModePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items :[
    {
      src: 'atm-card',
      name:'ATM Card'
    },
    {
      src:'net-banking',
      name: 'NET Banking'
    }
  ]
}
