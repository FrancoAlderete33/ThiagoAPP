import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  urlBase: String = 'https://localhost:7061/api/Calendar/'

  constructor(private httpClient: HttpClient) { }

  createEvent(EventObj: any) {
    return this.httpClient.post<any>(`${this.urlBase}NewOne`, EventObj);
  }

  getEventsByDate(formattedDate: any){
    return this.httpClient.get<any>(`${this.urlBase}ByDate?date=${formattedDate.date}&clientTimeZone=${formattedDate.clientTimeZone}`);
  }

  getEventsByToday(clientTimeZone: string){
    return this.httpClient.get<any>(`${this.urlBase}Today?clientTimeZone=${clientTimeZone}`);
  }

  deleteEvent(eventId: number){
    return this.httpClient.delete<any>(`${this.urlBase}delete/${eventId}`);
  }
}
