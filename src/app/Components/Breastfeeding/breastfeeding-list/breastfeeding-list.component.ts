import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BreastfeedingService } from '../../../Services/breastfeeding.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-breastfeeding-list',
  templateUrl: './breastfeeding-list.component.html',
  styleUrls: ['./breastfeeding-list.component.css']
})
export class BreastfeedingListComponent {
  breastFeedings: any[] = [];


  constructor(private breastfeedingService: BreastfeedingService,
    private router: Router) { }

  ngOnInit(): void {
    // Obtener la zona horaria del cliente desde el navegador
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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


}
