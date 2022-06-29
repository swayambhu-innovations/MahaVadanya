import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  payments=[
    {
      image:'../../assets/card.svg',
      paymentMode:'ATM Card',
      desc:'Visa, MasterCard ,RuPay & More',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
