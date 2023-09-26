// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RecoverPasswordComponent } from './components/login/recover-password/recover-password.component';
import { RestorePasswordComponent } from './components/login/restore-password/restore-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    NavbarComponent,
    LoaderComponent,
    RegisterPatientComponent,
    FooterComponent,
    RecoverPasswordComponent,
    RestorePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
