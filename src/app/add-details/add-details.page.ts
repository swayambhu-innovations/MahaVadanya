import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.page.html',
  styleUrls: ['./add-details.page.scss'],
})
export class AddDetailsPage implements OnInit {

  constructor(public modalSevices:ModalService) { }

  ngOnInit() {
  }

}
