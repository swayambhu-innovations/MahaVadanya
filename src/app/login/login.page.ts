import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthencationService } from '../services/authencation.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  showCnfPwd = false;
  emailControl:UntypedFormControl = new UntypedFormControl('',[Validators.required,Validators.email])
  passwordControl:UntypedFormControl = new UntypedFormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(50)])
  signInForm:UntypedFormGroup = new UntypedFormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    public authService: AuthencationService,
    private alertify: AlertsAndNotificationsService,
    private router: Router

  ) {}

  ngOnInit() {}

  login():void{
    console.log(this.signInForm);
    if (this.signInForm.status === 'VALID'){
      this.authService.loginEmailPassword(this.emailControl.value,this.passwordControl.value);
    } else {
      this.alertify.presentToast('Please fill all the fields correctly','error',3000);
    }
  }
  togglePassword(type) {
    if (type === 'p') {
      this.showPassword = !this.showPassword;
    } else if (type === 'c') {
      this.showCnfPwd = !this.showCnfPwd;
    }
  }
}
