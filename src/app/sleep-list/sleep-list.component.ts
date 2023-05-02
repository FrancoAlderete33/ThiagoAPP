import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SleepService } from '../Services/sleep.service';

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
}
