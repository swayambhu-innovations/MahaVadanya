import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activeseva1',
  templateUrl: './activeseva.page.html',
  styleUrls: ['./activeseva.page.scss'],
})
export class ActivesevaPage implements OnInit {
  @Input() slot = '108';
  @Input() endtime = '12:00 am';
  @Input() sname = 'Coffee';
  constructor() { }

  ngOnInit() {
  }

}
