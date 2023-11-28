// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from 'src/app/guards/authguard.guard';

// Components
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { OdontogramComponent } from './odontogram/odontogram.component';
import { CreateInterventionComponent } from './odontogram/create-intervention/create-intervention.component';

const routes: Routes = [
  {
    path: 'patient',
    component: RegisterPatientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'patient/:id',
    component: RegisterPatientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'odontogram/:id',
    component: OdontogramComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'intervention/:patientId',
    component: CreateInterventionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'intervention/:patientId/:interventionId',
    component: CreateInterventionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
