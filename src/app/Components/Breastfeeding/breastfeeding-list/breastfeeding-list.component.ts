import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BreastfeedingService } from '../../../Services/breastfeeding.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-breastfeeding-list',
  templateUrl: './breastfeeding-list.component.html',
  styleUrls: ['./breastfeeding-list.component.css']
})
export class BreastfeedingListComponent {
  breastFeedings: any[] = [];
  clientTimeZone!: string;
  filterForm: FormGroup;
  // breastFeedingsQuantity!: number ;

  constructor(private breastfeedingService: BreastfeedingService, private router: Router) {
    //Formulario para filtro por fecha
    this.filterForm = new FormGroup({
      filterDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // Obtener la zona horaria del cliente desde el navegador
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.clientTimeZone = clientTimeZone;
    this.breastfeedingService.getBreastfeedingsByToday(clientTimeZone).subscribe(data => {
      this.breastFeedings = data;
    });
  }

  //* Funcion para formatear el tiempo 
  formatTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }

  //* Funcion para formatear el tiempo si los minutos son mas > 60
  formatDuration(durationInMinutes: number): string {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const hoursString = hours > 0 ? `${hours} hora${hours > 1 ? 's' : ''}` : '';
    const minutesString = minutes > 0 ? `${minutes} minuto${minutes > 1 ? 's' : ''}` : '';
    return `${hoursString} ${minutesString}`;
  }


  onDelete(breastFeedingId: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este periodo de lactancia?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.breastfeedingService.deleteBreastFeeding(breastFeedingId).subscribe(() => {
          Swal.fire({
            title: 'Periodo de lactancia eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Actualizar la lista de periodos de lactancia después de eliminar uno
            this.breastFeedings = this.breastFeedings.filter(
              (breastFeeding) => breastFeeding.id !== breastFeedingId
            )
          });
        });
      }
    });
  }

  onFilterSubmit() {
    const selectedDate = this.filterForm.value.filterDate;

    if (selectedDate) {
      const formattedDate = {
        date: selectedDate,
        clientTimeZone: this.clientTimeZone
      };


      this.breastfeedingService.getBreastfeedingsByDate(formattedDate).subscribe(
        (response: any) => {
          this.breastFeedings = response;
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }

  onResetFilters() {
    // Resetear el valor del campo de fecha a null
    this.filterForm.patchValue({ filterDate: null });

    // Obtener los registros de lactancia del día actual
    this.breastfeedingService.getBreastfeedingsByToday(this.clientTimeZone).subscribe(data => {
      this.breastFeedings = data;
    });
  }



}
