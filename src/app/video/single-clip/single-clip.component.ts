import { Clip } from 'src/app/models/Clip.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-clip',
  templateUrl: './single-clip.component.html',
  styleUrls: ['./single-clip.component.css'],
})
export class SingleClipComponent implements OnInit {
  @Input('clip') clip: Clip | null = null;
  @Output('selectClip') selectClip: EventEmitter<Clip> =
    new EventEmitter<Clip>();
  @Output('onDeleteClip') onDeleteClip: EventEmitter<Clip> =
    new EventEmitter<Clip>();
  constructor() {}

  ngOnInit(): void {}

  onSelectClip = () => {
    this.selectClip.emit(this.clip as Clip);
  };

  onDeleteClipHandler = () => {
    if (confirm('Do you want to delete that video')) {
      this.onDeleteClip.emit(this.clip as Clip);
    }
  };

  copyToClipboard = async (event: MouseEvent, docId: string | undefined) => {
    event.preventDefault();
    if (!docId) {
      return;
    }
    const url = `${location.origin}/clip/${docId}`;

    await navigator.clipboard.writeText(url);
    alert('Link Copied!') 
  }
}
