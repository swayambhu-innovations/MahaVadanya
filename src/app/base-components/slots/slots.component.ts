import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  @Input() activeslot = '';
  constructor( private router: Router) { }
navigate(){
// this.router.navigate([`/${link}`]);
console.log('hioi');
}
segmentChanged(link: any){
  this.router.navigate([`/${link}`]);
}
  ngOnInit() {}

}
