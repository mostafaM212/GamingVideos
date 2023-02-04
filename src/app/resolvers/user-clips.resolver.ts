import { Clip } from 'src/app/models/Clip.model';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClipService } from '../services/clip.service';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore/public_api';

@Injectable({
  providedIn: 'root',
})
export class UserClipsResolver
  implements Resolve<QueryDocumentSnapshot<Clip>[]>
{
  constructor(private clipsService: ClipService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<QueryDocumentSnapshot<Clip>[]> {
    return this.clipsService.getUserClips();
  }
}
