import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import videojs from 'video.js';
import { Clip } from '../../models/Clip.model';
import { FbTimestampPipe } from '../../pipes/fb-timestamp.pipe';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers : [FbTimestampPipe]
})
export class ClipComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayer?: ElementRef
  clip?: Clip;
  player?: videojs.Player;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.player = videojs(this.videoPlayer?.nativeElement);

    this.activatedRoute.data.subscribe(data => {
      this.clip = data['clip'] as Clip
    })

    if (this.clip) {
      this.player.src({
        src: this.clip.url,
        type: 'video/mp4',
      });
    }
  }
}


