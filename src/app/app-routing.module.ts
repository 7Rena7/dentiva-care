// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom Modules
import { PagesRoutingModule } from './components/pages/pages.routing';
import { AuthRoutingModule } from './components/auth/auth.routing';

// Guards
import { AuthGuard } from './guards/authguard.guard';

// Components
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';

const routes: Routes = [
  { path: 'register', component: RegisterUserComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'no-page-found',
    component: NoPageFoundComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'no-page-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
