import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonFunction } from '../common';
import { DataProvider } from '../providers/data.provider';
import { AuthencationService } from '../Services/authentication.service';
import { AlertsAndNotificationsService } from '../Services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signinForm: FormGroup;
  validationMessages: any;
  formErrors: any = {
    email: '',
    password: ''
  };
  constructor(private dataProvider: DataProvider, private fb: FormBuilder, private authService: AuthencationService, private alertify: AlertsAndNotificationsService) {
    this.signinForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ]
    });
    this.validationMessages = {

      email: {
        required: `Please Enter Email Address`,
        email: `Please check the Email Address.`
      },
      password: {
        required: `Please Enter Password.`,
        minLength: `Minimum 8 characters required.`
      }
    };
  }


  ngOnInit() {
    console.log('user data', this.dataProvider);
  }
  login(formdata: any){
    console.log(formdata);
    this.generateErrors();
    if (formdata.valid){
      this.authService.loginEmailPassword(formdata.value.email,formdata.value.password);
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
        CommonFunction.setErrMsgs(this.signinForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }
}
