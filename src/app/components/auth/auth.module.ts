// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login/login.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RestorePasswordComponent,
    RecoverPasswordComponent,
  ],
  exports: [LoginComponent, RestorePasswordComponent, RecoverPasswordComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
})
export class AuthModule {}
