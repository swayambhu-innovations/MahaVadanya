import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-widget',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
})
export class NotificationWidgetComponent implements OnInit {
  @Input() time:string = 'Just Now'
  constructor() { }

  ngOnInit() {}

}
