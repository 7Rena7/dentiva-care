import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent {
  restorePasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get password() {
    return this.restorePasswordForm.get('password');
  }
  get isPasswordInvalid() {
    return this.password?.touched && this.password?.invalid;
  }

  get confirmPassword() {
    return this.restorePasswordForm.get('confirmPassword');
  }
  get isConfirmPasswordInvalid() {
    return (
      (this.confirmPassword?.dirty &&
        this.confirmPassword?.invalid &&
        this.confirmPassword?.touched) ||
      this.confirmPassword?.value !== this.password?.value
    );
  }

  userId = '';
  showLoader = false;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.userId = parameter['userid'];
    });
  }

  public restorePassword() {
    this.restorePasswordForm.markAllAsTouched();
    if (this.restorePasswordForm.invalid) return;

    this.showLoader = true;

    this.loginService
      .restorePassword(this.restorePasswordForm, this.userId)
      .subscribe(
        () => {
          this.showLoader = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:
              'Se ha cambiado su contraseña, ahora puede iniciar sesión con su nueva contraseña',
            showConfirmButton: false,
            timer: 2500,
          });
          this.route.navigate(['/login']);
        },
        (err) => {
          console.log(err);
          this.showLoader = false;
          // Check if error.status is 4XX
          if (err.status >= 400 && err.status < 500) {
            let errorMsg = '';
            if (typeof err.error === 'string') {
              errorMsg += `${err.error}`;
            } else if (err.error.msg !== null) {
              errorMsg += `${err.error.msg}`;
            }

            Swal.fire({
              icon: 'error',
              title: errorMsg,
              showConfirmButton: true,
            });
            return;
          }

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
