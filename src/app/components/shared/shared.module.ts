import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, LoaderComponent, FooterComponent],
  exports: [NavbarComponent, LoaderComponent, FooterComponent],
  imports: [CommonModule],
})
export class SharedModule {}
