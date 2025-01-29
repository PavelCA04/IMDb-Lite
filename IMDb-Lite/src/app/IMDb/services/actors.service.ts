
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';
import { Actor } from '../interfaces/actors.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private url = `${environment.baseUrl}/actor`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getActors(searchParams: { [key: string]: any } = {}): Observable<Actor[]> {
    const params = new HttpParams({ fromObject: searchParams });
    return this.httpClient.get<Actor[]>(this.url, { params });
  }
  
  getActorById(id: string): Observable<Actor | undefined> {
    return this.httpClient.get<Actor>(`${this.url}/${id}`)
      .pipe(
        catchError(err => of(undefined))
      )
    ;
  }

  updateActor(actor:Actor):Observable<Actor>{
    if (!actor._id){
      throw new Error('El id es necesatio')
    } 
    return this.httpClient.patch<Actor>(`${this.url}/${actor._id}`, actor)
  }

  deleteActorById(id:string):Observable<Actor | undefined>{
    return this.httpClient.delete<Actor>(`${this.url}/${id}`)
      .pipe(
        catchError(err => of(undefined))
      )
  }

  addActor(actor:Actor):Observable<Actor>{
    return this.httpClient.post<Actor>(this.url, actor)
  }

}
