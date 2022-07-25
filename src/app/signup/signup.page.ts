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
  });

  constructor(
    public authService: AuthencationService,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit() {}

  submit() {
    if (this.signupForm.valid) {
      this.authService.signUpWithEmailAndPassword(
        this.signupForm.get('username').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value,
      );
    } else {
      this.alertify.presentToast(
        'Please fill all the fields correctly',
        'error',
        3000
      );
    }
  }
}
