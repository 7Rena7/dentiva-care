import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
      Validators.pattern('^[0-9]*$'),
    ]),
    cuil: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(11),
      Validators.pattern('^[0-9]*$'),
    ]),
    telephone: new FormControl('', [
      Validators.maxLength(20),
      Validators.pattern('^[0-9]*$'),
    ]),
    consultingRoomName: new FormControl('', [Validators.maxLength(50)]),
    consultingRoomTelephone: new FormControl('', [
      Validators.maxLength(20),
      Validators.pattern('^[0-9]*$'),
    ]),
    consultingRoomProvinceName: new FormControl('', [
      Validators.maxLength(100),
    ]),
    consultingRoomProvince: new FormControl('', [Validators.maxLength(100)]),
    consultingRoomCity: new FormControl('', [Validators.maxLength(100)]),
    consultingRoomPostalCode: new FormControl('', [Validators.maxLength(10)]),
    consultingRoomStreet: new FormControl('', [Validators.maxLength(100)]),
    consultingRoomNumber: new FormControl('', [Validators.maxLength(10)]),
    consultingRoomDepartment: new FormControl('', [Validators.maxLength(10)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    // @todo: figure out how validators work in Reactive Forms
    // Validators: [ confirmPasswordValidator ],
  });

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get isFirstNameInvalid() {
    return (
      this.firstName?.dirty &&
      this.firstName?.invalid &&
      this.firstName?.touched
    );
  }
  get isFirstNameValid() {
    return this.firstName?.valid;
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }
  get isLastNameInvalid() {
    return (
      this.lastName?.dirty && this.lastName?.invalid && this.lastName?.touched
    );
  }
  get isLastNameValid() {
    return this.lastName?.valid;
  }

  get dni() {
    return this.registerForm.get('dni');
  }
  get isDniInvalid() {
    return this.dni?.dirty && this.dni?.invalid && this.dni?.touched;
  }
  get isDniValid() {
    return this.dni?.valid;
  }

  get cuil() {
    return this.registerForm.get('cuil');
  }
  get isCuilInvalid() {
    return this.cuil?.dirty && this.cuil?.invalid && this.cuil?.touched;
  }
  get isCuilValid() {
    return this.cuil?.valid;
  }

  get telephone() {
    return this.registerForm.get('telephone');
  }
  get isTelephoneInvalid() {
    return (
      this.telephone?.dirty &&
      this.telephone?.invalid &&
      this.telephone?.touched &&
      this.telephone?.value !== ''
    );
  }
  get isTelephoneValid() {
    return this.telephone?.valid && this.telephone?.value !== '';
  }

  get consultingRoomName() {
    return this.registerForm.get('consultingRoomName');
  }
  get isConsultingRoomNameInvalid() {
    return (
      this.consultingRoomName?.dirty &&
      this.consultingRoomName?.invalid &&
      this.consultingRoomName?.touched &&
      this.consultingRoomName?.value !== ''
    );
  }
  get isConsultingRoomNameValid() {
    return (
      this.consultingRoomName?.valid && this.consultingRoomName?.value !== ''
    );
  }

  get consultingRoomTelephone() {
    return this.registerForm.get('consultingRoomTelephone');
  }
  get isConsultingRoomTelephoneInvalid() {
    return (
      this.consultingRoomTelephone?.dirty &&
      this.consultingRoomTelephone?.invalid &&
      this.consultingRoomTelephone?.touched &&
      this.consultingRoomTelephone?.value !== ''
    );
  }
  get isConsultingRoomTelephoneValid() {
    return (
      this.consultingRoomTelephone?.valid &&
      this.consultingRoomTelephone?.value !== ''
    );
  }

  get consultingRoomProvince() {
    return this.registerForm.get('consultingRoomProvince');
  }
  get isConsultingRoomProvinceValid() {
    return (
      this.consultingRoomProvince?.valid &&
      this.consultingRoomProvince?.value !== ''
    );
  }

  get consultingRoomCity() {
    return this.registerForm.get('consultingRoomCity');
  }
  get isConsultingRoomCityValid() {
    return (
      this.consultingRoomCity?.valid && this.consultingRoomCity?.value !== ''
    );
  }

  get consultingRoomPostalCode() {
    return this.registerForm.get('consultingRoomPostalCode');
  }
  get isConsultingRoomPostalCodeInvalid() {
    return (
      this.consultingRoomPostalCode?.dirty &&
      this.consultingRoomPostalCode?.invalid &&
      this.consultingRoomPostalCode?.touched &&
      this.consultingRoomPostalCode?.value !== ''
    );
  }
  get isConsultingRoomPostalCodeValid() {
    return (
      this.consultingRoomPostalCode?.valid &&
      this.consultingRoomPostalCode?.value !== ''
    );
  }

  get consultingRoomStreet() {
    return this.registerForm.get('consultingRoomStreet');
  }
  get isConsultingRoomStreetInvalid() {
    return (
      this.consultingRoomStreet?.dirty &&
      this.consultingRoomStreet?.invalid &&
      this.consultingRoomStreet?.touched &&
      this.consultingRoomStreet?.value !== ''
    );
  }
  get isConsultingRoomStreetValid() {
    return (
      this.consultingRoomStreet?.valid &&
      this.consultingRoomStreet?.value !== ''
    );
  }

  get consultingRoomNumber() {
    return this.registerForm.get('consultingRoomNumber');
  }
  get isConsultingRoomNumberInvalid() {
    return (
      this.consultingRoomNumber?.dirty &&
      this.consultingRoomNumber?.invalid &&
      this.consultingRoomNumber?.touched &&
      this.consultingRoomNumber?.value !== ''
    );
  }
  get isConsultingRoomNumberValid() {
    return (
      this.consultingRoomNumber?.valid &&
      this.consultingRoomNumber?.value !== ''
    );
  }

  get consultingRoomDepartment() {
    return this.registerForm.get('consultingRoomDepartment');
  }
  get isConsultingRoomDepartmentInvalid() {
    return (
      this.consultingRoomDepartment?.dirty &&
      this.consultingRoomDepartment?.invalid &&
      this.consultingRoomDepartment?.touched &&
      this.consultingRoomDepartment?.value !== ''
    );
  }
  get isConsultingRoomDepartmentValid() {
    return (
      this.consultingRoomDepartment?.valid &&
      this.consultingRoomDepartment?.value !== ''
    );
  }

  get email() {
    return this.registerForm.get('email');
  }
  get isEmailInvalid() {
    return this.email?.dirty && this.email?.invalid && this.email?.touched;
  }
  get isEmailValid() {
    return this.email?.valid;
  }

  get password() {
    return this.registerForm.get('password');
  }
  get isPasswordInvalid() {
    return (
      this.password?.dirty && this.password?.invalid && this.password?.touched
    );
  }
  get isPasswordValid() {
    return this.password?.valid;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get isConfirmPasswordInvalid() {
    return (
      (this.confirmPassword?.dirty &&
        this.confirmPassword?.invalid &&
        this.confirmPassword?.touched) ||
      this.confirmPassword?.value !== this.password?.value
    );
  }
  get isConfirmPasswordValid() {
    return (
      this.confirmPassword?.valid &&
      this.confirmPassword?.value === this.password?.value
    );
  }

  showLoader = false;
  selectedProvinceId: string = '';
  provinces$: Observable<any[]>;
  cities$: Observable<any[]> | undefined;

  constructor(
    public register: UserService,
    private geolocation: GeolocationService,
    public route: Router
  ) {
    this.provinces$ = this.geolocation.getProvinces().pipe(
      catchError((error) => {
        console.error(error);
        throw new Error(error);
      })
    );
  }

  onProvinceSelected(event: Event) {
    if (
      !(this.selectedProvinceId === (event.target as HTMLSelectElement).value)
    ) {
      this.selectedProvinceId = (event.target as HTMLSelectElement).value;
      this.registerForm.controls.consultingRoomProvinceName.setValue(
        (event.target as HTMLSelectElement).options[
          (event.target as HTMLSelectElement).selectedIndex
        ].text.toLowerCase()
      );
      this.cities$ = this.geolocation.getCities(this.selectedProvinceId).pipe(
        catchError((error) => {
          console.error(error);
          throw new Error(error);
        })
      );
    }
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.controls.firstName.markAsDirty();
      this.registerForm.controls.lastName.markAsDirty();
      this.registerForm.controls.dni.markAsDirty();
      this.registerForm.controls.cuil.markAsDirty();
      this.registerForm.controls.telephone.markAsDirty();
      this.registerForm.controls.consultingRoomName.markAsDirty();
      this.registerForm.controls.consultingRoomTelephone.markAsDirty();
      this.registerForm.controls.consultingRoomProvince.markAsDirty();
      this.registerForm.controls.consultingRoomCity.markAsDirty();
      this.registerForm.controls.consultingRoomPostalCode.markAsDirty();
      this.registerForm.controls.consultingRoomStreet.markAsDirty();
      this.registerForm.controls.consultingRoomNumber.markAsDirty();
      this.registerForm.controls.consultingRoomDepartment.markAsDirty();
      this.registerForm.controls.email.markAsDirty();
      this.registerForm.controls.password.markAsDirty();
      this.registerForm.controls.confirmPassword.markAsDirty();
      this.registerForm.markAllAsTouched();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title:
          'Revise los campos del formulario, hay campos obligatorios sin completar',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.showLoader = true;

    this.register.registerUser(this.registerForm).subscribe(
      () => {
        this.showLoader = false;
        Swal.fire({ icon: 'success', title: 'Usuario Creado' }).then(
          (result) => {
            if (result.isConfirmed) {
              this.route.navigate(['/login']);
            }
          }
        );
      },
      (err) => {
        this.showLoader = false;
        const errors = err.error.errors;
        let message = '';
        errors.forEach((error: any) => {
          message += `${error.msg}`;
        });

        Swal.fire({
          icon: 'error',
          title:
            'Ha ocurrido un error, copie el mensaje inferior y envíelo a los administradores del sistema',
          text: `${message}`,
        });
        console.log(err);
      }
    );
  }
}
