import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ArticleInfoComponent } from './article-info/article-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: SearchBarComponent, data: {title: 'gallery', depth: 1} },
  { path: 'info/:id', component: ArticleInfoComponent, data: {title: 'info', depth: 2} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
