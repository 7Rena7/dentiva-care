import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from 'src/app/helpers/formatDate';
import { LineIntervention, Teeth } from 'src/app/types';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-line-intervention',
  templateUrl: './line-intervention.component.html',
})
export class LineInterventionComponent implements AfterViewInit {
  @Input() teeths: Teeth[] = [];
  @Input() id: number | undefined;
  @Input() lineData: LineIntervention | undefined;
  @Output() deleteLine = new EventEmitter<number | undefined>();
  @Output() updateLine = new EventEmitter<FormGroup>();

  availableTreatments = [
    'Extracción',
    'Obturación',
    'Endodoncia',
    'Corona',
    'Protesis',
  ];

  availableTeethSections = [
    'derecha',
    'izquierda',
    'posterior',
    'frontal',
    'superior',
  ];

  lineInterventionForm = new FormGroup({
    treatment: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    teethNumber: new FormControl(null as unknown, [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    section: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    done: new FormControl(false),
    date: new FormControl(formatDate(new Date()), [Validators.minLength(10)]),
  });

  get treatment() {
    return this.lineInterventionForm.get('treatment');
  }
  get isTreatmentInvalid() {
    return (
      this.treatment?.dirty &&
      this.treatment?.invalid &&
      this.treatment?.touched
    );
  }
  get isTreatmentValid() {
    return this.treatment?.valid && this.treatment?.value !== '';
  }

  get teethNumber() {
    return this.lineInterventionForm.get('teethNumber');
  }
  get isTeethNumberInvalid() {
    return (
      this.teethNumber?.dirty &&
      this.teethNumber?.invalid &&
      this.teethNumber?.touched
    );
  }
  get isTeethNumberValid() {
    return this.teethNumber?.valid && this.teethNumber?.value !== '';
  }

  get section() {
    return this.lineInterventionForm.get('section');
  }
  get isSectionInvalid() {
    return (
      this.section?.dirty && this.section?.invalid && this.section?.touched
    );
  }
  get isSectionValid() {
    return this.section?.valid && this.section?.value !== '';
  }

  get done() {
    return this.lineInterventionForm.get('done');
  }

  get date() {
    return this.lineInterventionForm.get('date');
  }
  get isDateInvalid() {
    return this.date?.dirty && this.date?.touched && !this.date?.value;
  }
  get isDateValid() {
    return this.date?.valid && this.date?.value;
  }

  get isLineInterventionValid() {
    return (
      this.lineInterventionForm.dirty &&
      this.isTreatmentValid &&
      this.isTeethNumberValid &&
      this.isSectionValid &&
      this.done &&
      this.isDateValid
    );
  }

  ngAfterViewInit() {
    console.log(this.lineData);
    if (this.lineData) {
      this.treatment?.setValue(this.lineData.treatment);
      this.teethNumber?.setValue(this.lineData.teethNumber);
      this.section?.setValue(this.lineData.section);
      this.done?.setValue(this.lineData.done);
      if (this.lineData.date !== '') this.date?.setValue(this.lineData.date);
    } else this.updateLineIntervention();
  }

  updateLineIntervention() {
    this.updateLine.emit(this.lineInterventionForm);
  }

  deleteLineIntervention(id: number | undefined) {
    this.deleteLine.emit(id);
  }
}
