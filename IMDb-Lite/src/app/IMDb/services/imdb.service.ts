import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';
import { Movie } from '../interfaces/imdb.interfaces';


@Injectable({
  providedIn: 'root'
})
export class IMDbService {

  private url = `${environment.baseUrl}/movie`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies(searchParams: { [key: string]: any } = {}): Observable<Movie[]> {
    const params = new HttpParams({ fromObject: searchParams });
    return this.httpClient.get<Movie[]>(this.url, { params });
  }
  
  getMovieById(id: string): Observable<Movie | undefined> {
    return this.httpClient.get<Movie>(`${this.url}/${id}`)
      .pipe(
        catchError(err => of(undefined))
      )
    ;
  }

  updateMovie(movie:Movie):Observable<Movie>{
    if (!movie._id){
      throw new Error('El id es necesatio')
    } 
    return this.httpClient.patch<Movie>(`${this.url}/${movie._id}`, movie)
  }

  deleteMovieById(id:string):Observable<Movie | undefined>{
    return this.httpClient.delete<Movie>(`${this.url}/${id}`)
      .pipe(
        catchError(err => of(undefined))
      )
  }

  addMovie(movie:Movie):Observable<Movie>{
    return this.httpClient.post<Movie>(this.url, movie)
  }

}
