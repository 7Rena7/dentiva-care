import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get isEmailInvalid() {
    return this.email?.touched && this.email?.invalid;
  }

  get password() {
    return this.loginForm.get('password');
  }
  get isPasswordInvalid() {
    return this.password?.touched && this.password?.invalid;
  }

  showLoader = false;

  constructor(public loginService: LoginService, public route: Router) {}

  public login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.showLoader = true;

    this.loginService.login(this.loginForm).subscribe(
      (token) => {
        this.showLoader = false;
        localStorage.setItem('token', token);
        this.route.navigate(['/home']);
      },
      (err) => {
        console.log(err);
        this.showLoader = false;
        let message = '';
        if (err.error.errors) {
          const errors = err.error.errors;
          errors.forEach((error: any) => {
            message += `${error.msg}`;
          });
        } else {
          message += `${err.error.msg}`;
        }

        Swal.fire({
          icon: 'error',
          title:
            'Ha ocurrido un error, copie el mensaje inferior y envíelo a los administradores del sistema',
          text: `${message}`,
        });
      }
    );
  }
}
