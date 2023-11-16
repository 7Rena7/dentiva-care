import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { formatDate } from 'src/app/helpers/formatDate';
import { InterventionsService } from 'src/app/services/interventions.service';
import { PatientsService } from 'src/app/services/patients.service';
import { LineIntervention, Teeth } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-intervention',
  templateUrl: './create-intervention.component.html',
})
export class CreateInterventionComponent {
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

  get isLineInterventionsValid() {
    try {
      this.lineInterventions.forEach((line) => {
        if (
          line.teethNumber === null ||
          line.section === '' ||
          line.treatment === '' ||
          (line.done === true && line.date === '')
        )
          throw new Error('Linea incompleta');
      });

      if (this.lineInterventions.length < 1) {
        throw new Error('No hay lineas');
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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

  lineInterventions: LineIntervention[] = [];
  interventionId: string = '';
  patientId: string = '';
  teeths: Teeth[] = [];
  showLoader = false;
  interventionInfoLoading = false;

  constructor(
    private interventionsService: InterventionsService,
    private patientService: PatientsService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.patientId = params['patientId'];
      this.interventionId = params['interventionId'];
      this.patientService
        .getPatientById(this.patientId)
        .subscribe((patient) => {
          this.teeths = patient.teeths;
        });
    });
  }

  ngOnInit(): void {
    if (this.interventionId) {
      this.interventionInfoLoading = true;
      this.interventionsService
        .getInterventionById(this.patientId, this.interventionId)
        .subscribe((intervention) => {
          this.interventionInfoLoading = false;
          this.interventionForm.controls.date.setValue(intervention.date);
          this.interventionForm.controls.softTissues.setValue(
            intervention.softTissues
          );
          this.interventionForm.controls.observations.setValue(
            intervention.observations
          );
          this.lineInterventions = intervention.lineInterventions;
        });
    }
  }

  addLineIntervention() {
    this.lineInterventions.push({
      index: this.lineInterventions.length,
      teethNumber: null,
      section: '',
      treatment: '',
      done: false,
      date: '',
      uid: '',
    });
  }

  updateLineIntervention(id: number, form: FormGroup) {
    const lineIntervention = this.lineInterventions[id];
    lineIntervention.teethNumber = form.controls['teethNumber'].value;
    lineIntervention.section = form.controls['section'].value;
    lineIntervention.treatment = form.controls['treatment'].value;
    lineIntervention.done = form.controls['done'].value;
    lineIntervention.date = '';
    if (lineIntervention.done === true)
      lineIntervention.date = form.controls['date'].value;
  }

  deleteLineIntervention(id: number | undefined) {
    const newArray = this.lineInterventions.slice();
    if (!newArray) return;
    newArray.splice(id || 0, 1);
    this.lineInterventions = newArray;
  }

  registerUpdateIntervention() {
    this.showLoader = true;
    if (this.interventionForm.invalid) {
      this.showLoader = false;
      this.interventionForm.controls.date.markAsDirty();
      this.interventionForm.markAllAsTouched();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Revise los campos obligatorios y vuelva a intentarlo',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!this.isLineInterventionsValid) {
      this.showLoader = false;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Revise que todas las líneas creadas hayan sido completadas',
        showConfirmButton: true,
        timer: 10000,
      });
      return;
    }

    if (this.interventionId) return this.updateIntervention();
    else return this.registerIntervention();
  }

  registerIntervention() {
    this.showLoader = true;

    this.interventionsService
      .registerIntervention(
        this.interventionForm,
        this.lineInterventions || [],
        this.patientId
      )
      .subscribe(
        () => {
          this.showLoader = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Intervención registrada con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['/odontogram', this.patientId]);
        },
        (error) => {
          this.showLoader = false;

          const errors = error.error.errors;
          let message = '';
          errors.forEach((err: any) => {
            message += `${err.msg}`;
          });

          Swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un error, copie el mensaje inferior y envíelo a los administradores del sistema',
            text: `${message}`,
          });

          console.error(error);
        }
      );
  }

  updateIntervention() {
    this.interventionsService
      .updateIntervention(
        this.interventionId,
        this.interventionForm,
        this.lineInterventions || []
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
          this.route.navigate(['/odontogram', this.patientId]);
        },
        (error) => {
          this.showLoader = false;

          const errors = error.error.errors;
          let message = '';
          errors.forEach((err: any) => {
            message += `${err.msg}`;
          });

          Swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un error, copie el mensaje inferior y envíelo a los administradores del sistema',
            text: `${message}`,
          });

          console.error(error);
        }
      );
  }
}
