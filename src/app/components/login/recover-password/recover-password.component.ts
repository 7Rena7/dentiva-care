import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  recoverPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  get email() {
    return this.recoverPasswordForm.get('email');
  }
  get isEmailInvalid() {
    return this.email?.touched && this.email?.invalid;
  }

  showLoader = false;

  constructor(public loginService: LoginService, public route: Router) {}

  public recoverPassword() {
    this.recoverPasswordForm.markAllAsTouched();
    if (this.recoverPasswordForm.invalid) return;

    this.showLoader = true;

    this.loginService.recoverPassword(this.recoverPasswordForm).subscribe(
      (token) => {
        this.showLoader = false;
        localStorage.setItem('restoreToken', token);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:
            'Se ha enviado un correo electrónico con las instrucciones para recuperar su contraseña',
          showConfirmButton: false,
          timer: 2500,
        });
        this.route.navigate(['/login']);
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
