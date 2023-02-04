import { SafeURLPipe } from './pipes/safe-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';
import { SingleClipComponent } from './single-clip/single-clip.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    SingleClipComponent,
    EditComponent,
    SafeURLPipe,
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SingleClipComponent],
})
export class VideoModule {}
