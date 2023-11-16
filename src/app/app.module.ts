// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './components/pages/pages.module';
import { AuthModule } from './components/auth/auth.module';

// Components
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';

@NgModule({
  declarations: [AppComponent, RegisterUserComponent, NoPageFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
