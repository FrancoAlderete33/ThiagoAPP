import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BowelmovementService } from 'src/app/Services/bowelmovement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bowelmovement-list',
  templateUrl: './bowelmovement-list.component.html',
  styleUrls: ['./bowelmovement-list.component.css']
})
export class BowelmovementListComponent {
  bowelMovements: any[] = [];
  filterForm!: FormGroup;
  clientTimeZone!: string; 

  constructor(private bowelmovementService: BowelmovementService) {
      this.filterForm = new FormGroup({
        filterDate: new FormControl('', [Validators.required])
      });
     }

  ngOnInit(): void {
    // Obtener la zona horaria del cliente desde el navegador
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.clientTimeZone = clientTimeZone;
    this.bowelmovementService.getBowelMovementByToday(clientTimeZone).subscribe(data => {
      this.bowelMovements = data;
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


  onDelete(bowelMovementId: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este control de heces?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bowelmovementService.deleteBowelMovement(bowelMovementId).subscribe(() => {
          Swal.fire({
            title: 'Control de heces eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Actualizar la lista de periodos de lactancia después de eliminar uno
            this.bowelMovements = this.bowelMovements.filter(
              (bowelmovement) => bowelmovement.id !== bowelMovementId
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


      this.bowelmovementService.getBowelMovementByDate(formattedDate).subscribe(
        (response: any) => {
          this.bowelMovements = response;
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
    this.bowelmovementService.getBowelMovementByToday(this.clientTimeZone).subscribe(data => {
      this.bowelMovements = data;
    });
  }

}
