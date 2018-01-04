import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArticleService }  from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss']
})
export class ArticleInfoComponent implements OnInit {
  @Input() article: Article;

  constructor(
  private route: ActivatedRoute,
  private articleService: ArticleService,
  private location: Location
  ) {}

  ngOnInit(): void {
  this.getArticle();
}

getArticle(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.articleService.getArticle(id)
    .subscribe(article => this.article = article);
}

}
