import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { formatDate } from 'src/app/helpers/formatDate';
import { PatientsService } from 'src/app/services/patients.service';
import { InterventionsResponse, Patient } from 'src/app/types';
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
  interventions$: Observable<InterventionsResponse> | undefined;
  patientHasIllnesses = false;
  private searchTimeout: any;

  constructor(
    public patients: PatientsService,
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
      this.patients.getPatientById(params['id']).subscribe((patient) => {
        this.patient$ = this.patients.getPatientById(params['id']);
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
      });
    });
  }

  ngOnInit(): void {
    this.search?.valueChanges.subscribe((searchValue) => {
      clearTimeout(this.searchTimeout); // Clear any existing timeout

      // Set a timeout to perform the search after a delay (300ms in this example)
      this.searchTimeout = setTimeout(() => {
        this.performSearch(searchValue?.toLowerCase() || '');
      }, 200);
    });
  }

  performSearch(searchValue: string) {
    this.interventions$ = this.patients.getInterventions(searchValue);
  }

  deleteIntervention(uid: string) {
    console.log('delete intervention', uid);
  }
}
