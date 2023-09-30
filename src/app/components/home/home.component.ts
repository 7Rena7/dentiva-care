import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, last, map } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { PatientsResponse } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  get search() {
    return this.searchForm.get('search');
  }

  patients$: Observable<PatientsResponse> | undefined;
  // totalPatients$: Observable<number> | undefined;
  private searchTimeout: any; // Variable to hold the timeout ID

  constructor(public patients: PatientsService) {
    this.patients$ = this.patients.getPatients('');
  }

  ngOnInit(): void {
    this.search?.valueChanges.subscribe((searchValue) => {
      clearTimeout(this.searchTimeout); // Clear any existing timeout

      // Set a timeout to perform the search after a delay (300ms in this example)
      this.searchTimeout = setTimeout(() => {
        this.performSearch(searchValue?.toLowerCase() || '');
      }, 200);
    });
  }

  performSearch(searchValue: string) {
    this.patients$ = this.patients.getPatients(searchValue);
  }

  deletePatient(firstName: string, lastName: string, uid: string) {
    Swal.fire({
      title: `Borrar ${firstName} ${lastName}?`,
      text: `Estas segur@ que deseas eliminar el paciente ${firstName} ${lastName}?`,
      icon: 'warning',
      confirmButtonText: 'Borrar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Borrando ${firstName} ${lastName}...`,
          text: `Espere un momento.`,
          icon: 'info',
          allowOutsideClick: false,
        });
        const btn = Swal.getConfirmButton() || undefined;
        Swal.showLoading(btn);
        this.patients.deletePatient(uid).subscribe(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Paciente eliminado correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
          this.patients$ = this.patients.getPatients('');
          this.search?.setValue('');
        });
      }
    });
  }
}
