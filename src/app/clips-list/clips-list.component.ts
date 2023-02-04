import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';


@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe],
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input('scrollable') scrollable: boolean = true;

  constructor(public clipService: ClipService) {
    this.clipService.getClips();
  }

  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.onScrollHandler);
    }
  }
  onScrollHandler = () => {
    const { offsetHeight, scrollTop } = document.documentElement;
    const { innerHeight } = window;
    let isBottom: boolean =
      innerHeight + Math.round(scrollTop) === offsetHeight;
    if (isBottom) {
    }
  };
  ngOnDestroy(): void {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.onScrollHandler);
    }
    this.clipService.pageClips = [];
  }
}
