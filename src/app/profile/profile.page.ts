import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../providers/data.provider';
import { DatabaseService } from '../services/database.service';
import { DataProviderService } from '../services/dataProvider/data-provider.service';
import { UserService } from '../services/user/user.service';
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
    
    displayName: new FormControl(),
    dob: new FormControl(''),
    profession: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
  });

  constructor(public dataProvider: DataProvider,private user:UserService,  public dataProviderr:DataProviderService) {}

  ngOnInit() {
    if(this.dataProviderr.user){
      this.editForm.patchValue(this.dataProviderr.user);
    }
  }


  updateProfile() {
    console.log(this.editForm.value)
    this.editForm.patchValue(this.dataProviderr.user);
    this.user.updateUser(this.dataProviderr.user.userId.replace(' ', ''), this.editForm.value)

  }
}
