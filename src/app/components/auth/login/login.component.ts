import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  constructor(
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.route.navigate(['/home']);
    }

    this.activatedRoute.params.subscribe((params) => {
      if (!params['activateToken']) return;
      this.userService.confirmUser(params['activateToken']).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title:
              'Usuario confirmado, ingrese con su email y contraseña para continuar',
            showConfirmButton: true,
            timer: 5000,
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed || result.isDenied) {
              this.route.navigate(['/login']);
            }
          });
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un error al confirmar el usuario, por favor intente nuevamente haciendo click en el link que se le envio a su email o contacte al administrador',
            text: `Error: ${err.message}`,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['/login']);
            }
          });
        }
      );
    });
  }

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
