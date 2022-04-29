import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isSubmitting = false;

  loginForm = this.fb.group({
    username: ['admin', [Validators.required]],
    password: ['123456', [Validators.required]],
    rememberMe: [true],
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  login() {
    this.isSubmitting = true;
    this.auth
      .login(this.username?.value, this.password?.value, this.rememberMe?.value)
      .pipe(
        filter(authenticated => {
          return authenticated;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        },
      });
  }
}
