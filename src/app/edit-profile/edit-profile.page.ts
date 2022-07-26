import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataProvider } from '../providers/data.provider';
// declare const UIkit: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editProfile = false;
  currentEditId = '';
  isModalOpen = false;

  constructor(public dataProvider: DataProvider) {}
  ngOnInit() {
    console.log(this.dataProvider.userData);
  }
  toggleOpen() {
    this.isModalOpen = !this.isModalOpen;
  };
  toggleEditProfile() {
    this.editProfile = !this.editProfile;
  }
}
