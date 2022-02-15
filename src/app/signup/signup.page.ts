import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFunction } from '../common';
import { DataProvider } from '../providers/data.provider';
import { AuthencationService } from '../Services/authentication.service';
import { AlertsAndNotificationsService } from '../Services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  validationMessages: any;
  formErrors: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword : ''
  };
  constructor(private dataProvider: DataProvider, private fb: FormBuilder, private authService: AuthencationService, private alertify: AlertsAndNotificationsService) {
    this.signupForm = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      confirmPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ]
    });
    this.validationMessages = {
      name: {
        required: `Please Enter Name`,
      },
      email: {
        required: `Please Enter Email Address`,
        email: `Please check the Email Address.`
      },
      password: {
        required: `Please Enter Password.`,
        minLength: `Minimum 8 characters required.`
      },
      confirmPassword: {
        required: `Please Confirm Password.`,
        minLength: `Minimum 8 characters required.`
      }
    };
  }

  ngOnInit() {
  }

  signup(formdata: any){
    console.log(formdata);
    this.generateErrors();
    if (formdata.status === 'VALID'){
      if (formdata.value.password === formdata.value.confirmPassword){
        console.log(formdata.value);
        this.authService.signUpWithEmailAndPassword(formdata.value.email,formdata.value.password,formdata.value.fullName);
      } else {
        this.alertify.presentToast('Password and Confirm Password do not match','error',3000);
      }
    } else {
      this.alertify.presentToast('Please fill all the fields correctly','error',3000);
    }
  }
  // ERROR GENERATIONS
  private generateErrors() {
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Set errors for fields not inside datesGroup
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        CommonFunction.setErrMsgs(this.signupForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }
}
