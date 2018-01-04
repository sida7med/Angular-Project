import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from './article';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArticleService {

  private articlesUrl = 'api/articles';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET articles from the server */
  getArticles (): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl)
      .pipe(
        tap(articles => this.log(`fetched articles`)),
        catchError(this.handleError('getArticles', []))
      );
  }

  /** GET article by id. Return `undefined` when id not found */
  getArticleNo404<Data>(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/?id=${id}`;
    return this.http.get<Article[]>(url)
      .pipe(
        map(articles => articles[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} article id=${id}`);
        }),
        catchError(this.handleError<Article>(`getArticle id=${id}`))
      );
  }

  /** GET article by id. Will 404 if id not found */
  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  /* GET articles whose name contains search term */
  searchArticles(term: string): Observable<Article[]> {
    if (!term.trim()) {
      // if not search term, return empty article array.
      return of([]);
    }
    return this.http.get<Article[]>(`api/articles/?location=${term}`).pipe(
      tap(_ => this.log(`found articles matching "${term}"`)),
      catchError(this.handleError<Article[]>('searchArticles', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new article to the server */
  addArticle (article: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, article, httpOptions).pipe(
      tap((article: Article) => this.log(`added article w/ id=${article.id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  /** DELETE: delete the article from the server */
  deleteArticles (article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articlesUrl}/${id}`;

    return this.http.delete<Article>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticles'))
    );
  }

  /** PUT: update the article on the server */
  updateArticle (article: Article): Observable<any> {
    return this.http.put(this.articlesUrl, article, httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>('updateArticle'))
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
