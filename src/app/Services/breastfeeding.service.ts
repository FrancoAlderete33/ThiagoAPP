import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BreastfeedingService {
  urlBase: String = 'https://localhost:7061/api/Breastfeeding/'

  constructor(private httpClient: HttpClient) { }

  
  createBreastfeeding(BreastFeedingObj: any) {
    return this.httpClient.post<any>(`${this.urlBase}NewOne`, BreastFeedingObj);
  }
  
  getBreastfeedingsByDate(formattedDate: any){
    return this.httpClient.get<any>(`${this.urlBase}ByDate?date=${formattedDate.date}&clientTimeZone=${formattedDate.clientTimeZone}`);
  }
  

  getBreastfeedingsByToday(clientTimeZone: string) {
    return this.httpClient.get<any>(`${this.urlBase}Today?clientTimeZone=${clientTimeZone}`);
  }

  getBreastfeedingById(id: number) {
    return this.httpClient.get<any>(`${this.urlBase}${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  updateBreastfeeding(updatedBreastfeeding: any) {
    return this.httpClient.put<any>(`${this.urlBase}update/${updatedBreastfeeding.id}`, updatedBreastfeeding);
  }

  deleteBreastFeeding(breastFeedingId : number){
    return this.httpClient.delete<any>(`${this.urlBase}delete/${breastFeedingId}`);
  }
  
}
