import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthencationService } from '../services/authencation.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword:new FormControl('', Validators.required),
  });

  constructor(
    public authService: AuthencationService,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit() {}

  submit() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      if(this.signupForm.value.password===this.signupForm.value.confirmPassword){

        this.authService.signUpWithEmailAndPassword(
          this.signupForm.get('username').value,
          this.signupForm.get('email').value,
          this.signupForm.get('password').value,
          );
          console.log(this.signupForm.value);
        }
        else{
          this.alertify.presentToast('Password and Confirm Password do not match ','error',3000);
        }
    } else {
      this.alertify.presentToast(
        'Please fill all the fields correctly',
        'error',
        3000
      );
    }
  }
}
