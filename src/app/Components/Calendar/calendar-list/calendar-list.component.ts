import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/Services/calendar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent {
  events: any[] = [];
  clientTimeZone!: string;
  filterForm: FormGroup;

  constructor(private calendarService: CalendarService, private router: Router) {
    //Formulario para filtro por fecha
    this.filterForm = new FormGroup({
      filterDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // Obtener la zona horaria del cliente desde el navegador
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.clientTimeZone = clientTimeZone;
    this.calendarService.getEventsByToday(clientTimeZone).subscribe(data => {
      this.events = data;
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

  onDelete(eventId: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este evento?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.calendarService.deleteEvent(eventId).subscribe(() => {
          Swal.fire({
            title: 'Evento eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Actualizar la lista de periodos de lactancia después de eliminar uno
            this.events = this.events.filter(
              (event) => event.id !== eventId
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


      this.calendarService.getEventsByDate(formattedDate).subscribe(
        (response: any) => {
          this.events = response;
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
    this.calendarService.getEventsByToday(this.clientTimeZone).subscribe(data => {
      this.events = data;
    });
  }

}
