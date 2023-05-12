import { Component } from '@angular/core';
import { SleepService } from '../../../Services/sleep.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sleep-list',
  templateUrl: './sleep-list.component.html',
  styleUrls: ['./sleep-list.component.css']
})
export class SleepListComponent {
  sleeps: any[] = [];
  filterForm!: FormGroup;
  clientTimeZone!: string;
  sleepsTotalMinutes!: number;

  constructor(private sleepService: SleepService) {
    this.filterForm = new FormGroup({
      filterDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // Obtener la zona horaria del cliente desde el navegador
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.clientTimeZone = clientTimeZone;
    this.refreshData(); // Llamar al método para obtener los datos inicialmente
  }

  private refreshData(): void {
    this.sleepService.getSleepsByToday(this.clientTimeZone).subscribe(data => {
      this.sleeps = data;
    });

    this.sleepService.GetTotalSleepsByToday(this.clientTimeZone).subscribe(data => {
      this.sleepsTotalMinutes = data;
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

  onDelete(sleepgId: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este periodo de sueño?',
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
            title: 'Periodo de sueño eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Llamar a la función para actualizar los datos después de eliminar uno
            this.refreshData();
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


      this.sleepService.getSleepsByDate(formattedDate).subscribe(
        (response: any) => {
          this.sleeps = response;
        },
        (error: any) => {
          console.log(error);
        }
      );

    }
  }


  onResetFilters() {
    // Resetear el valor del campo de fecha a null
    this.filterForm.patchValue({ filterDate: null });

    // Obtener los registros de lactancia del día actual
    this.refreshData();
  }

}
