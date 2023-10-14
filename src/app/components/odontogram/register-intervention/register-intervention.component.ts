import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from 'src/app/helpers/formatDate';
import { InterventionsService } from 'src/app/services/interventions.service';
import { PatientsService } from 'src/app/services/patients.service';
import { LineIntervention, Teeth } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-intervention',
  templateUrl: './register-intervention.component.html',
  styleUrls: ['./register-intervention.component.css'],
})
export class RegisterInterventionComponent implements OnDestroy {
  interventionForm = new FormGroup({
    date: new FormControl(formatDate(new Date()), [
      Validators.required,
      Validators.minLength(10),
    ]),
    softTissues: new FormControl('', Validators.maxLength(1000)),
    observations: new FormControl('', Validators.maxLength(1000)),
  });

  get date() {
    return this.interventionForm.get('date');
  }
  get dateValue() {
    return this.date?.value || '';
  }
  get isDateInvalid() {
    return (
      this.date?.dirty &&
      this.date?.invalid &&
      this.date?.touched &&
      !this.date?.value
    );
  }
  get isDateValid() {
    return this.date?.valid && this.date?.value;
  }

  get softTissues() {
    return this.interventionForm.get('softTissues');
  }
  get isSoftTissuesInvalid() {
    return (
      this.softTissues?.dirty &&
      this.softTissues?.invalid &&
      this.softTissues?.touched
    );
  }
  get isSoftTissuesValid() {
    return this.softTissues?.valid && this.softTissues?.value;
  }

  get observations() {
    return this.interventionForm.get('observations');
  }
  get isObservationsInvalid() {
    return (
      this.observations?.dirty &&
      this.observations?.invalid &&
      this.observations?.touched
    );
  }
  get isObservationsValid() {
    return this.observations?.valid && this.observations?.value;
  }

  @Input() interventionId: string = '';
  @Input() teeths: Teeth[] = [];
  @Input() patientId: string = '';
  showLoader = false;
  interventionInfoLoading = false;
  lineInterventions: LineIntervention[] = [];

  constructor(private interventions: InterventionsService) {}

  ngOnInit(): void {
    if (this.interventionId) {
      this.interventionInfoLoading = true;
      this.interventions
        .getInterventionById(this.interventionId)
        .subscribe((intervention) => {
          this.interventionInfoLoading = false;
          // Populate intervention information
        });
    }
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.date?.setValue(formatDate(new Date()));
      this.softTissues?.setValue('');
      this.observations?.setValue('');
      this.lineInterventions = [];
    }, 200);
  }

  addLineIntervention() {
    this.lineInterventions.push({
      index: this.lineInterventions.length,
      teethNumber: '',
      section: '',
      treatment: '',
      done: false,
      uid: '',
    });
    // console.log('add line', this.lineInterventions);
  }

  updateLineIntervention(id: number, form: FormGroup) {
    // console.log(id, form);
    const lineIntervention = this.lineInterventions[id];
    lineIntervention.teethNumber = form.controls['teethNumber'].value;
    lineIntervention.section = form.controls['teethSection'].value;
    lineIntervention.treatment = form.controls['treatment'].value;
    lineIntervention.done = form.controls['done'].value;
    // console.log(this.lineInterventions);
  }

  deleteLineIntervention(id: number | undefined) {
    // console.log(id);
    const newArray = this.lineInterventions.slice();
    newArray.splice(id || 0, 1);
    this.lineInterventions = newArray;
    // console.log(this.lineInterventions);
  }

  registerUpdateIntervention(): Promise<boolean> {
    // console.log(this.date?.value);
    // console.log(this.interventionForm);
    // console.log(this.lineInterventions);
    if (this.interventionForm.invalid) {
      this.interventionForm.controls.date.markAsDirty();
      this.interventionForm.markAllAsTouched();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title:
          'Revise los campos del formulario, hay campos obligatorios sin completar',
        showConfirmButton: false,
        timer: 1500,
      });
      return new Promise((resolve) => resolve(false));
    }

    this.showLoader = true;

    if (this.interventionId) {
      this.interventions
        .updateIntervention(
          this.interventionId,
          this.interventionForm,
          this.lineInterventions
        )
        .subscribe(
          () => {
            this.showLoader = false;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Intervención actualizada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
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
    } else {
      this.interventions
        .registerIntervention(
          this.interventionForm,
          this.lineInterventions,
          this.patientId
        )
        .subscribe(
          () => {
            this.showLoader = false;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Intervención creada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
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
    return new Promise((resolve) => resolve(true));
  }
}
