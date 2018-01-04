import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Weather } from './weather';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WeatherService {

  private weathersUrl = 'api/weathers';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getWeathers (): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.weathersUrl)
      .pipe(
        tap(weathers => this.log(`fetched weathers`)),
        catchError(this.handleError('getWeathers', []))
      );
  }

  /** GET weather by id. Return `undefined` when id not found */
  getWeatherNo404<Data>(id: number): Observable<Weather> {
    const url = `${this.weathersUrl}/?id=${id}`;
    return this.http.get<Weather[]>(url)
      .pipe(
        map(weathers => weathers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} weather id=${id}`);
        }),
        catchError(this.handleError<Weather>(`getWeather id=${id}`))
      );
  }

  /** GET weather by id. Will 404 if id not found */
  getWeather(id: number): Observable<Weather> {
    const url = `${this.weathersUrl}/${id}`;
    return this.http.get<Weather>(url).pipe(
      tap(_ => this.log(`fetched weather id=${id}`)),
      catchError(this.handleError<Weather>(`getWeather id=${id}`))
    );
  }

  /* GET weathers whose name contains search term */
  searchWeathers(term: string): Observable<Weather[]> {
    if (!term.trim()) {
      // if not search term, return empty weather array.
      return of([]);
    }
    return this.http.get<Weather[]>(`api/weathers/?location=${term}`).pipe(
      tap(_ => this.log(`found weather matching "${term}"`)),
      catchError(this.handleError<Weather[]>('searchWeathers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new weather to the server */
  addWeather (weather: Weather): Observable<Weather> {
    return this.http.post<Weather>(this.weathersUrl, weather, httpOptions).pipe(
      tap((weather: Weather) => this.log(`added weather w/ id=${weather.id}`)),
      catchError(this.handleError<Weather>('addWeather'))
    );
  }

  /** DELETE: delete the weather from the server */
  deleteWeather (weather: Weather | number): Observable<Weather> {
    const id = typeof weather === 'number' ? weather : weather.id;
    const url = `${this.weathersUrl}/${id}`;

    return this.http.delete<Weather>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted weather id=${id}`)),
      catchError(this.handleError<Weather>('deleteWeather'))
    );
  }

  /** PUT: update the weather on the server */
  updateWeather (weather: Weather): Observable<any> {
    return this.http.put(this.weathersUrl, weather, httpOptions).pipe(
      tap(_ => this.log(`updated weather id=${weather.id}`)),
      catchError(this.handleError<any>('updateWeather'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
