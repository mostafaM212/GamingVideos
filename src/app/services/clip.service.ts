import { pluck, switchMap, of, map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Clip } from './../models/Clip.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Resolve } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ClipService implements Resolve<Clip | null> {
  public clipsCollection: AngularFirestoreCollection<Clip>;
  pageClips: Clip[] = [];
  pendingRequest: boolean = false;
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.clipsCollection = this.db.collection('clips');
  }

  createClip = async (clip: Clip) => {
    let id: string = await (await this.clipsCollection.add(clip)).id;
    this.router.navigate(['clip', id]);
  };

  getUserClips = () => {
    return this.auth.user.pipe(
      pluck('uid'),
      switchMap((uid) => {
        if (!uid) {
          return of([]);
        }
        const query = this.clipsCollection.ref.where('uid', '==', uid);

        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<Clip>).docs)
    );
  };

  updateClip = (id: string, title: string) => {
    return this.clipsCollection.doc(id).update({
      title,
    });
  };

  deleteClip = async (clip: Clip): Promise<void> => {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`);
    const screenshotRef = this.storage.ref(`${clip.screenshotFileName}`);
    await clipRef.delete();
    await screenshotRef.delete();

    return this.clipsCollection.doc(clip.docId).delete();
  };

  getClips = async () => {
    if (this.pendingRequest) {
      return;
    }
    this.pendingRequest = true;
    let query = await this.clipsCollection.ref
      .orderBy('timestamp', 'desc')
      .limit(6);
    const { length } = this.pageClips;
    if (length) {
      const lastDocId = this.pageClips[length - 1].docId;
      const lastDoc = this.clipsCollection.doc(lastDocId).get().toPromise();

      query = query.startAfter(lastDoc);
    }
    const snapshot = await query.get();

    snapshot.forEach((doc) => {
      this.pageClips.push({
        docId: doc.id,
        ...doc.data(),
      });
    });
    this.pendingRequest = false;
  };
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Clip | Observable<Clip | null> | Promise<Clip | null> | null {
    return this.clipsCollection.doc(route.params['id']).get().pipe(map(snapshot => {
      const data = snapshot.data();

      if (!data) {
        this.router.navigate(['/']);
        return null;
      }
      return data;
    }));
  }
}
