import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.page.html',
  styleUrls: ['./add-details.page.scss'],
})
export class AddDetailsPage implements OnInit {

  isModalOpen = false;
  constructor() { }
  toggleOpen() {
    this.isModalOpen =  !this.isModalOpen;
  }
  ngOnInit() {
  }

}
