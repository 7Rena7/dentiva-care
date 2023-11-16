// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/authguard.guard';
import { RestorePasswordGuard } from './guards/restore-password.guard';

// Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { RecoverPasswordComponent } from './components/login/recover-password/recover-password.component';
import { RestorePasswordComponent } from './components/login/restore-password/restore-password.component';
import { OdontogramComponent } from './components/odontogram/odontogram.component';
import { CreateInterventionComponent } from './components/odontogram/create-intervention/create-intervention.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
  },
  {
    path: 'restore-password/:userid',
    component: RestorePasswordComponent,
    canActivate: [RestorePasswordGuard],
  },
  { path: 'register', component: RegisterUserComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
