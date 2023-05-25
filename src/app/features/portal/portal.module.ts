import { NgModule } from '@angular/core';
import { PortalComponent } from './portal.component';
import { DetailView } from './views/detail/detail.view';
import { HomeView } from './views/home/home.view';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalCommonsModule } from './commons/commons.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/shared/interceptors/error.interceptor';
import { AboutView } from './views/about/about.view';
import { NotFoundView } from './views/not-found/not-found.view';
import { ArticleView } from './views/article/article.view';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { LoadingInterceptor } from '../../shared/interceptors/loading.interceptor';
import { PlayListView } from './views/play-list/play-list.view';

@NgModule({
  declarations: [PortalComponent, HomeView, DetailView, AboutView, NotFoundView, ArticleView, PlayListView],
  imports: [
    CommonModule,
    PortalRoutingModule,
    PortalCommonsModule,
    SharedComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class PortalModule { }
