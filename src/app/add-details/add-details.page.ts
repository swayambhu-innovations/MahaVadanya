import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AdmissionService } from '../services/admission/admission.service';
import { DataProviderService } from '../services/dataProvider/data-provider.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.page.html',
  styleUrls: ['./add-details.page.scss'],
})
export class AddDetailsPage implements OnInit {

  isModalOpen = false;

  public addAdmissionForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', [Validators.required]),
    selectPlan: new FormControl('Weekly', [Validators.required]),
    startDate: new FormControl(Date.now(), [Validators.required]),
    batchSlot: new FormControl('', [Validators.required]),
  });

  

  constructor( private dataProvider:DataProviderService, private router:Router) { }

  toggleOpen() { this.isModalOpen = !this.isModalOpen; }

  ngOnInit() { }

  addAdmission() {
    const data = {
      ...this.addAdmissionForm.value,
      status: false,
    }
    this.dataProvider.admission = data;
    this.router.navigateByUrl('/select-seat')
    console.log(this.dataProvider.admission)
  }


}
