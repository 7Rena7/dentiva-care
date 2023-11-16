import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { formatDate, formatSpanishDate } from 'src/app/helpers/formatDate';
import { PatientsService } from 'src/app/services/patients.service';
import { InterventionsResponse, Patient } from 'src/app/types';
import { InterventionsService } from 'src/app/services/interventions.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css'],
})
export class OdontogramComponent {
  patientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    cuil: new FormControl(''),
    dob: new FormControl(''),
    telephone: new FormControl(''),
    medicalService: new FormControl(''),
    medicalServiceNumber: new FormControl(''),
    otherIllnesses: new FormControl(''),
    otherDetails: new FormControl(''),
    generalApretiation: new FormControl(''),
  });

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  get search() {
    return this.searchForm.get('search');
  }

  patient$: Observable<Patient> | undefined;
  patientId: string = '';
  interventions$: Observable<InterventionsResponse> | undefined;
  patientHasIllnesses = false;
  showLoader = false;
  modal!: bootstrap.Modal | null;

  constructor(
    public patients: PatientsService,
    private interventionsService: InterventionsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.patientForm.controls.firstName.disable();
    this.patientForm.controls.lastName.disable();
    this.patientForm.controls.dni.disable();
    this.patientForm.controls.cuil.disable();
    this.patientForm.controls.dob.disable();
    this.patientForm.controls.telephone.disable();
    this.patientForm.controls.medicalService.disable();
    this.patientForm.controls.medicalServiceNumber.disable();
    this.patientForm.controls.otherIllnesses.disable();
    this.patientForm.controls.otherDetails.disable();
    this.patientForm.controls.generalApretiation.disable();
    this.activatedRoute.params.subscribe((params) => {
      this.patientId = params['id'];
      this.patient$ = this.patients.getPatientById(this.patientId).pipe(
        map((patient: Patient) => {
          this.patientForm.controls.firstName.setValue(patient.firstName);
          this.patientForm.controls.lastName.setValue(patient.lastName);
          this.patientForm.controls.dni.setValue(patient.dni);
          this.patientForm.controls.cuil.setValue(patient.cuil);
          this.patientForm.controls.dob.setValue(formatDate(patient.dob));
          this.patientForm.controls.telephone.setValue(patient.telephone);
          this.patientForm.controls.medicalService.setValue(
            patient.medicalService
          );
          this.patientForm.controls.medicalServiceNumber.setValue(
            patient.medicalServiceNumber
          );
          this.patientForm.controls.otherIllnesses.setValue(
            patient.otherIllnesses
          );
          this.patientForm.controls.otherDetails.setValue(patient.otherDetails);
          this.patientForm.controls.generalApretiation.setValue(
            patient.generalApretiation
          );
          this.patientHasIllnesses =
            patient.alergies ||
            patient.diabetes ||
            patient.reumaticFiber ||
            patient.epilepsy ||
            patient.cardiopathy ||
            patient.hepatithis ||
            patient.other;
          return patient;
        })
      );

      this.getInterventions();
    });
  }

  getInterventions() {
    this.interventions$ = this.interventionsService.getInterventions(
      this.patientId
    );
  }

  getCreateInterventionModal() {
    const myModal = document.getElementById('createIntervention');
    this.modal = bootstrap.Modal.getInstance(myModal as HTMLElement);
  }

  deleteIntervention(
    uid: string,
    date: string,
    firstName: string,
    lastName: string
  ) {
    date = formatSpanishDate(date);
    Swal.fire({
      title: `Borrar Intervención de la fecha ${date}?`,
      text: `Estas segur@ que deseas eliminar la intervención del paciente ${firstName} ${lastName} de la fecha ${date}?`,
      icon: 'warning',
      confirmButtonText: 'Borrar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Borrando Intervención...`,
          text: `Espere un momento.`,
          icon: 'info',
          allowOutsideClick: false,
        });
        const btn = Swal.getConfirmButton() || undefined;
        Swal.showLoading(btn);
        this.interventionsService.deleteIntervention(uid).subscribe(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Intervención eliminada correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
          this.interventions$ = this.interventionsService.getInterventions(
            this.patientId
          );
          this.search?.setValue('');
        });
      }
    });
  }

  // ngOnDestroy(): void {
  //   this.registerInterventionComponent.ngOnDestroy();
  // }
}
