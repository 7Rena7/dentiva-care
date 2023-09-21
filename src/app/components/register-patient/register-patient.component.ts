import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { RegisterService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
})
export class RegisterPatientComponent {
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
    dob: new FormControl('', [Validators.required, Validators.minLength(10)]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('^[0-9]*$'),
    ]),
    province: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    medicalService: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    medicalServiceNumber: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    alergies: new FormControl(false, []),
    diabetes: new FormControl(false, []),
    neumaticFiber: new FormControl(false, []),
    epilepsy: new FormControl(false, []),
    cardiopathy: new FormControl(false, []),
    hepatithis: new FormControl(false, []),
    other: new FormControl(false, []),
    otherIllnesses: new FormControl('', [Validators.maxLength(1000)]),
    otherDetails: new FormControl('', [Validators.maxLength(1000)]),
    generalApretiation: new FormControl('', [Validators.maxLength(1000)]),
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

  get dob() {
    return this.registerForm.get('dob');
  }
  get isDobInvalid() {
    return this.dob?.dirty && this.dob?.invalid && this.dob?.touched;
  }
  get isDobValid() {
    return this.dob?.valid;
  }

  get telephone() {
    return this.registerForm.get('telephone');
  }
  get isTelephoneInvalid() {
    return (
      this.telephone?.dirty &&
      this.telephone?.invalid &&
      this.telephone?.touched
    );
  }
  get isTelephoneValid() {
    return this.telephone?.valid;
  }

  get province() {
    return this.registerForm.get('province');
  }
  get isProvinceInvalid() {
    return (
      this.province?.dirty && this.province?.invalid && this.province?.touched
    );
  }
  get isProvinceValid() {
    return this.province?.valid;
  }

  get city() {
    return this.registerForm.get('city');
  }
  get isCityInvalid() {
    return this.city?.dirty && this.city?.invalid && this.city?.touched;
  }
  get isCityValid() {
    return this.city?.valid;
  }

  get street() {
    return this.registerForm.get('street');
  }
  get isStreetInvalid() {
    return this.street?.dirty && this.street?.invalid && this.street?.touched;
  }
  get isStreetValid() {
    return this.street?.valid;
  }

  get number() {
    return this.registerForm.get('number');
  }
  get isNumberInvalid() {
    return this.number?.dirty && this.number?.invalid && this.number?.touched;
  }
  get isNumberValid() {
    return this.number?.valid;
  }

  get department() {
    return this.registerForm.get('department');
  }
  get isDepartmentInvalid() {
    return (
      this.department?.dirty &&
      this.department?.invalid &&
      this.department?.touched
    );
  }
  get isDepartmentValid() {
    return this.department?.valid;
  }

  get medicalService() {
    return this.registerForm.get('medicalService');
  }
  get isMedicalServiceInvalid() {
    return (
      this.medicalService?.dirty &&
      this.medicalService?.invalid &&
      this.medicalService?.touched
    );
  }
  get isMedicalServiceValid() {
    return this.medicalService?.valid;
  }

  get medicalServiceNumber() {
    return this.registerForm.get('medicalServiceNumber');
  }
  get isMedicalServiceNumberInvalid() {
    return (
      this.medicalServiceNumber?.dirty &&
      this.medicalServiceNumber?.invalid &&
      this.medicalServiceNumber?.touched &&
      this.medicalServiceNumber?.value !== ''
    );
  }
  get isMedicalServiceNumberValid() {
    return this.medicalServiceNumber?.valid;
  }

  get alergies() {
    return this.registerForm.get('alergies');
  }

  get diabetes() {
    return this.registerForm.get('diabetes');
  }

  get neumaticFiber() {
    return this.registerForm.get('neumaticFiber');
  }

  get epilepsy() {
    return this.registerForm.get('epilepsy');
  }

  get cardiopathy() {
    return this.registerForm.get('cardiopathy');
  }

  get hepatithis() {
    return this.registerForm.get('hepatithis');
  }

  get other() {
    return this.registerForm.get('other');
  }

  get otherIllnesses() {
    return this.registerForm.get('otherIllnesses');
  }

  get otherDetails() {
    return this.registerForm.get('otherDetails');
  }

  get generalApretiation() {
    return this.registerForm.get('generalApretiation');
  }

  showLoader = false;
  selectedProvinceId: string = '';
  selectedProvinceName: string = '';
  provinces$: Observable<any[]>;
  cities$: Observable<any[]> | undefined;

  constructor(
    public patients: PatientsService,
    public register: RegisterService,
    public route: Router
  ) {
    this.provinces$ = this.register.getProvinces().pipe(
      catchError((error) => {
        console.error(error);
        throw new Error(error);
      })
    );
  }

  onProvinceSelected(event: Event) {
    this.selectedProvinceId = (event.target as HTMLSelectElement).value;
    this.selectedProvinceName = (event.target as HTMLSelectElement).options[
      (event.target as HTMLSelectElement).selectedIndex
    ].text;
    this.cities$ = this.register.getCities(this.selectedProvinceId).pipe(
      catchError((error) => {
        console.error(error);
        throw new Error(error);
      })
    );
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.controls.firstName.markAsDirty();
      this.registerForm.controls.lastName.markAsDirty();
      this.registerForm.controls.dni.markAsDirty();
      this.registerForm.controls.cuil.markAsDirty();
      this.registerForm.controls.telephone.markAsDirty();
      this.registerForm.controls.dob.markAsDirty();
      this.registerForm.controls.province.markAsDirty();
      this.registerForm.controls.city.markAsDirty();
      this.registerForm.controls.street.markAsDirty();
      this.registerForm.controls.number.markAsDirty();
      this.registerForm.controls.department.markAsDirty();
      this.registerForm.controls.medicalService.markAsDirty();
      this.registerForm.markAllAsTouched();
      return;
    }

    this.showLoader = true;

    this.registerForm.controls.province.setValue(this.selectedProvinceName);

    this.patients.registerPatient(this.registerForm).subscribe(
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
      (err: any) => {
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
