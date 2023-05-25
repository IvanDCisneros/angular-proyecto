import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { AboutView } from './views/about/about.view';
import { ArticleView } from './views/article/article.view';
import { DetailView } from './views/detail/detail.view';
import { HomeView } from './views/home/home.view';
import { NotFoundView } from './views/not-found/not-found.view';
import { PlayListView } from './views/play-list/play-list.view';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: PortalComponent,
    children: [
      { path: 'home', component: HomeView },
      { path: 'article/:id', component: ArticleView },
      { path: 'detail/:id', component: DetailView },
      { path: 'about', component: AboutView },
      { path: 'play-list', component: PlayListView },
      { path: 'not-found', component: NotFoundView },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
