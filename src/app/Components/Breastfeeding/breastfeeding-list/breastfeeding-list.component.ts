import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BreastfeedingService } from '../../../Services/breastfeeding.service';

@Component({
  selector: 'app-breastfeeding-list',
  templateUrl: './breastfeeding-list.component.html',
  styleUrls: ['./breastfeeding-list.component.css']
})
export class BreastfeedingListComponent {
  breastFeedings: any[] = [];


  constructor(private breastfeedingService: BreastfeedingService){}

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
  
  
}
