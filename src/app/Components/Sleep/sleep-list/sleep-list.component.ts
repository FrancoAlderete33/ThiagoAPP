import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SleepService } from '../../../Services/sleep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sleep-list',
  templateUrl: './sleep-list.component.html',
  styleUrls: ['./sleep-list.component.css']
})
export class SleepListComponent {
  sleeps: any[] = [];

  constructor(private sleepService : SleepService){}

  ngOnInit(): void {
     // Obtener la zona horaria del cliente desde el navegador
     const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.sleepService.getSleepsByToday(clientTimeZone).subscribe((data => {
      this.sleeps = data;
    }))
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

  onDelete(sleepgId: number) {
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
        this.sleepService.deleteSleep(sleepgId).subscribe(() => {
          Swal.fire({
            title: 'Periodo de lactancia eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Actualizar la lista de periodos de lactancia después de eliminar uno
            this.sleeps = this.sleeps.filter(
              (sleep) => sleep.id !== sleepgId
            )
          });
        });
      }
    });
  }
}
