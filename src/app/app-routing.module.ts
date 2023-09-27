import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/authguard.guard';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { RecoverPasswordComponent } from './components/login/recover-password/recover-password.component';
import { RestorePasswordComponent } from './components/login/restore-password/restore-password.component';
import { RestorePasswordGuard } from './guards/restore-password.guard';

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
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
