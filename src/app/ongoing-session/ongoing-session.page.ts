import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
@Component({
  selector: 'app-ongoing-session',
  templateUrl: './ongoing-session.page.html',
  styleUrls: ['./ongoing-session.page.scss'],
})
export class OngoingSessionPage implements OnInit {

  constructor(public modalSevices:ModalService  ) { }

  ngOnInit() {
  }

}
