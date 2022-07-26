import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public authService: AuthencationService,
    private alertify: AlertsAndNotificationsService,
    private router: Router

  ) {}

  ngOnInit() {}

  submit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.loginEmailPassword(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).then(() => {
      this.router.navigate(['/home']);
      }).catch(() => {
      });
    } else {
      this.alertify.presentToast(
        'Please fill all the fields correctly',
        'error',
        3000
      );
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
