import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/governance-stats/2/14/2021';

  constructor(private http: HttpClient) { }

  passData(endpoint: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<any>(this.apiUrl);

  }


}
