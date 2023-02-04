import { NotFoundComponent } from './routes/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AboutComponent } from './routes/about/about.component';
import { ClipComponent } from './routes/clip/clip.component';
import { ClipService } from './services/clip.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'Home - Clips' },
  { path: 'about', component: AboutComponent, title: 'About - Clips' },
  {
    path: 'clip/:id',
    component: ClipComponent,
    title: 'Clip - Clips',
    resolve: { clip: ClipService },
  },
  {path : '' , loadChildren :async ()=>(await (await import('./video/video.module')).VideoModule)},
  { path: '**', component: NotFoundComponent, title: 'Not Found - Clips' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
