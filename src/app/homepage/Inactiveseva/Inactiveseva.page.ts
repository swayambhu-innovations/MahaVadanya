import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { BooksevaService } from 'src/app/Services/bookseva.service';

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
  constructor(private router: Router,private route: ActivatedRoute, public dataProvider: DataProvider, private bookSeva: BooksevaService) {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log(params.id);
      this.myAngularxQrCode = params.id;
    });
    //this.myAngularxQrCode = 'Your QR code data string';
   }

  ngOnInit() {
  }
  onActivate(){
    this.dataProvider.activeSeva = true;
    this.dataProvider.activeSevaId = this.myAngularxQrCode;
    console.log(this.dataProvider.activeSevaId);
    if(this.dataProvider.activeSevaId && this.dataProvider.activeSeva === true){
      this.bookSeva.activateSeva(this.myAngularxQrCode).then(
        (res) => {
          console.log(res);
          this.router.navigate([`/home/activeseva/${this.myAngularxQrCode}`]);
        }
      );
    }
  }
}
