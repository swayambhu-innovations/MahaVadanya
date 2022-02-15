import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activeseva1',
  templateUrl: './activeseva1.page.html',
  styleUrls: ['./activeseva1.page.scss'],
})
export class Activeseva1Page implements OnInit {
  @Input() slot = '108';
  @Input() endtime = '12:00 am';
  @Input() sname = 'Coffee';
  constructor() { }

  ngOnInit() {
  }

}
