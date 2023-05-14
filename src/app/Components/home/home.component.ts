import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BowelmovementService } from 'src/app/Services/bowelmovement.service';
import { BreastfeedingService } from 'src/app/Services/breastfeeding.service';
import { CalendarService } from 'src/app/Services/calendar.service';
import { SleepService } from 'src/app/Services/sleep.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  firstBreastFeeding!: any ;
  clientTimeZone!: string;

  constructor(private breastfeedingServices: BreastfeedingService,
    private sleepServices: SleepService,
    private calendarServices: CalendarService,
    private bowelMovementsServices: BowelmovementService) { }


    async ngOnInit(): Promise<void> {
      // Obtener la zona horaria del cliente desde el navegador
      const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.clientTimeZone = clientTimeZone;
    
      const data = await lastValueFrom(this.breastfeedingServices.getBreastfeedingsByToday(this.clientTimeZone));
      const filteredData = data.filter((breastFeeding: any, index: number) => index === 0);
      this.firstBreastFeeding = filteredData.shift();
      // Hacer lo que necesites con this.firstBreastFeeding
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
    
    
    

  





}
