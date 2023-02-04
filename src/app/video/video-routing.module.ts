import { UserClipsResolver } from './../resolvers/user-clips.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    title: 'Manage - Gaming',
    canActivate: [AuthGuard],
    resolve: { docs: UserClipsResolver },
  },
  {
    path: 'upload',
    component: UploadComponent,
    title: 'Upload - Gaming',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
