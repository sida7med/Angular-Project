import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  filteredArticles$: Observable<Article[]>;
  articles: Observable<Article[]>;
  private searchTerms = new Subject<string>();
  gif: string="assets/car.gif";

  constructor(private articleService: ArticleService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getArticles(): void {
    this.articleService.getArticles()
        .subscribe(articles => this.articles = of(articles));
  }

  ngOnInit(): void {
    this.getArticles();
    this.filteredArticles$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.articleService.searchArticles(term)),
    );
  }

}
