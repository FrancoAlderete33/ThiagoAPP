import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreastfeedingService {
  urlBase: String = 'https://localhost:7061/api/Breastfeeding/'

  constructor(private httpClient: HttpClient) { }


  createBreastfeeding(BreastFeedingObj: any) {
    return this.httpClient.post<any>(`${this.urlBase}NewOne`, BreastFeedingObj);
  }

  getBreastfeedingsByToday(clientTimeZone: string) {
    return this.httpClient.get<any>(`${this.urlBase}Today?clientTimeZone=${clientTimeZone}`);
  }

}
