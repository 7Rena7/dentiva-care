import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Teeth } from 'src/app/types';

@Component({
  selector: 'app-line-intervention',
  templateUrl: './line-intervention.component.html',
  styleUrls: ['./line-intervention.component.css'],
})
export class LineInterventionComponent {
  @Input() teeths: Teeth[] = [];
  @Input() id: number | undefined;
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
    'drontal',
    'superior',
  ];

  lineInterventionForm = new FormGroup({
    treatment: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    teethNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    teethSection: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    done: new FormControl(false),
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
    return this.treatment?.valid && this.treatment?.value;
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
    return this.teethNumber?.valid && this.teethNumber?.value;
  }

  get teethSection() {
    return this.lineInterventionForm.get('teethSection');
  }
  get isTeethSectionInvalid() {
    return (
      this.teethSection?.dirty &&
      this.teethSection?.invalid &&
      this.teethSection?.touched
    );
  }
  get isTeethSectionValid() {
    return this.teethSection?.valid && this.teethSection?.value;
  }

  updateLineIntervention() {
    this.updateLine.emit(this.lineInterventionForm);
  }

  deleteLineIntervention(id: number | undefined) {
    this.deleteLine.emit(id);
  }
}
