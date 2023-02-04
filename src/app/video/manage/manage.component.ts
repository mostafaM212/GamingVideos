import { Clip } from 'src/app/models/Clip.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, pluck } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  sort$: BehaviorSubject<string> = new BehaviorSubject<string>('recent');
  sortBy: string = 'recent';
  clips: Clip[] = [];
  activeClip: Clip | null = null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(pluck('sort')).subscribe((data) => {
      if (data) {
        this.sortBy = data;
      }
    });
    this.activatedRoute.data.pipe(pluck('docs')).subscribe((docs) => {
      (docs as QueryDocumentSnapshot<Clip>[]).forEach((doc) => {
        this.clips.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  sort = ({ value }: HTMLSelectElement) => {
    if (value === 'recent' || value === 'oldest') {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { sort: value },
        queryParamsHandling: 'merge',
      });
    }
    if (value === 'oldest') {
      this.clips.sort((p1, p2) =>
        p1.timestamp > p2.timestamp ? 1 : p1.timestamp < p2.timestamp ? -1 : 0
      );
      return;
    }
    this.clips.sort((p1, p2) =>
      p1.timestamp < p2.timestamp ? 1 : p1.timestamp > p2.timestamp ? -1 : 0
    );
  };
  onSelectClipHandler = (clip: Clip) => {
    this.activeClip = clip;
    this.modalService.toggleModal('editClip');
  };

  onUpdateClipHandler = (clip: Clip) => {
    this.clips = this.clips.map((item) => {
      if (item.docId === clip.docId) {
        return clip;
      }
      return item;
    });
    console.log(this.clips);
  };

  onDeleteClip = (clip: Clip) => {
    try {
      this.clipService.deleteClip(clip);
    } catch (error) {
      console.log(error);
    }
    this.clips = this.clips.filter((cl) => cl.docId !== clip.docId);
  };
}
