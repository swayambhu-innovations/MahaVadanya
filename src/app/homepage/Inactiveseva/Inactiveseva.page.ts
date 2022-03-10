import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-activeseva',
  templateUrl: './Inactiveseva.page.html',
  styleUrls: ['./Inactiveseva.page.scss'],
})
export class InactiveSevaPage implements OnInit {
  @Input() status = 'No Active Slot';
  @Input() sevastatus = 'D12 Slot Alreaday Booked';
  public myAngularxQrCode: string = null;
  private routeSub: Subscription = Subscription.EMPTY;
  constructor(private route: ActivatedRoute, public dataProvider: DataProvider) {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log(params.id);
      this.myAngularxQrCode = params.id;
    });
    //this.myAngularxQrCode = 'Your QR code data string';
   }

  ngOnInit() {
  }

}
