// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

// Pipes
import { DateSpanishFormatPipe } from 'src/app/pipes/date-spanish-format.pipe';

// Components
import { HomeComponent } from './home/home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { OdontogramComponent } from './odontogram/odontogram.component';
import { TeethComponent } from './odontogram/teeths/teeth/teeth.component';
import { TeethsComponent } from './odontogram/teeths/teeths.component';
import { CreateInterventionComponent } from './odontogram/create-intervention/create-intervention.component';
import { LineInterventionComponent } from './odontogram/create-intervention/line-intervention/line-intervention.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterPatientComponent,
    OdontogramComponent,
    TeethComponent,
    TeethsComponent,
    CreateInterventionComponent,
    LineInterventionComponent,
    DateSpanishFormatPipe,
  ],
  exports: [
    HomeComponent,
    RegisterPatientComponent,
    OdontogramComponent,
    TeethComponent,
    TeethsComponent,
    CreateInterventionComponent,
    LineInterventionComponent,
    DateSpanishFormatPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PagesModule {}
