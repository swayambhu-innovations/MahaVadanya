import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  editForm: UntypedFormGroup = new UntypedFormGroup({
    photoURL: new UntypedFormControl(),
    displayName: new UntypedFormControl(),
    dob: new UntypedFormControl(''),
    aadharNo: new UntypedFormControl(),
    profession: new UntypedFormControl(),
    age: new UntypedFormControl(),
    gender: new UntypedFormControl(),
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
