import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.page.html',
  styleUrls: ['./payment-successful.page.scss'],
})
export class PaymentSuccessfulPage implements OnInit {
  @Input() amount:string = '300.00'
  @Input() slot:string = 'Z18'
  @Input() time:string = '3:00 to 21:00'
  constructor() { }

  ngOnInit() {
  }

}
