import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  urlBase: String = 'https://localhost:7061/api/Sleep/'

  constructor(private httpClient: HttpClient) { }


  createSleeps(SleepsObj: any) {
    return this.httpClient.post<any>(`${this.urlBase}NewOne`, SleepsObj);
  }

  getSleepsByToday(clientTimeZone: string) {
    return this.httpClient.get<any>(`${this.urlBase}Today?clientTimeZone=${clientTimeZone}`);
  }

  deleteSleep(sleepId : number){
    return this.httpClient.delete<any>(`${this.urlBase}delete/${sleepId}`);
  }

}
