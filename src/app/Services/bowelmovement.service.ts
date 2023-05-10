import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BowelmovementService {

  urlBase: String = 'https://localhost:7061/api/BowelMovement/'

  constructor(private httpClient: HttpClient) { }


  createBowelMovement(BowelMovementObj: any) {
    return this.httpClient.post<any>(`${this.urlBase}NewOne`, BowelMovementObj);
  }

  getBowelMovementById(bowelmovementId: number) {
    return this.httpClient.get<any>(`${this.urlBase}${bowelmovementId}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  getBowelMovementByDate(formattedDate: any){
    return this.httpClient.get<any>(`${this.urlBase}ByDate?date=${formattedDate.date}&clientTimeZone=${formattedDate.clientTimeZone}`);
  }

  getBowelMovementByToday(clientTimeZone: string){
    return this.httpClient.get<any>(`${this.urlBase}Today?clientTimeZone=${clientTimeZone}`);
  }

  updateBowelMovement(updatedBowelmovement: any) {
    return this.httpClient.put<any>(`${this.urlBase}update/${updatedBowelmovement.id}`, updatedBowelmovement);
  }

  deleteBowelMovement(bowelMovementId : number ){
    return this.httpClient.delete<any>(`${this.urlBase}delete/${bowelMovementId}`);
  }
  

 
}
