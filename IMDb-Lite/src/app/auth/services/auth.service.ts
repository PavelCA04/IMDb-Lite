import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  signUp(user:any):Observable<any>{
    return this.httpClient.post(`${this.url}/signup`, user)
  }

  logIn(user:any):Observable<any>{
    return this.httpClient.post(`${this.url}/login`, user)
  }

}
