import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

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

  getSleepById(id: number) {
    return this.httpClient.get<any>(`${this.urlBase}${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  updateSleep(updatedSleep: any) {
    return this.httpClient.put<any>(`${this.urlBase}update/${updatedSleep.id}`, updatedSleep);
  }

  deleteSleep(sleepId : number){
    return this.httpClient.delete<any>(`${this.urlBase}delete/${sleepId}`);
  }

}
