import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../providers/data.provider';
import { DatabaseService } from '../services/database.service';
// declare const UIkit: any;
import { UserData } from '../structures/user.structure';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editProfile = false;
  currentEditId = '';
  isModalOpen = false;
  editForm: FormGroup = new FormGroup({
    photoURL: new FormControl(),
    displayName: new FormControl(),
    dob: new FormControl(''),
    aadharNo: new FormControl(),
    profession: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
  });

  constructor(public dataProvider: DataProvider,private databaseService: DatabaseService) {}

  ngOnInit() {
    console.log('jii');
    console.log(this.dataProvider);
  }
 submit() {
  console.log('submit');
  console.log(this.editForm.value);
 }
  toggleOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  goToEditMode() {
    this.editProfile = true;
    if (this.dataProvider.userData) {
      this.editForm.patchValue(this.dataProvider.userData);
      console.log(this.dataProvider.userData);
      console.log(this.editForm.value);
    }
  }
}
