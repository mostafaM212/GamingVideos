import { ClipService } from './../../services/clip.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { switchMap, combineLatest, forkJoin } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Clip } from 'src/app/models/Clip.model';
import { FfmpegService } from '../../services/ffmpeg.service';
import { SafeURLPipe } from '../pipes/safe-url.pipe';

export interface UploadStatus {
  status: string;
  color: string;
  message: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [],
})
export class UploadComponent implements OnDestroy, OnInit {
  /**
    class properties
  */
  task?: AngularFireUploadTask;
  user: firebase.User | null = null;
  uploadedClipData: Clip | null = null;
  uploadStatus: UploadStatus | null = null;
  uploadingPercentage: number = 0;
  isDragover: boolean = false;
  fileName: string = '';
  file: File | null = null;
  selectedImagePath: string = '';
  screenshots: string[] = [];
  screenshotTask?: AngularFireUploadTask;
  /**
   * constructor
   * @param storage
   * @param auth
   */
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService,
    public ffmpegService: FfmpegService
  ) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnInit(): void {
    this.ffmpegService.init();
  }

  ngOnDestroy(): void {
    this.task?.cancel();
  }
  onDropHandler = async (event: DragEvent | HTMLInputElement) => {
    this.isDragover = false;
    if (event instanceof DragEvent) {
      this.file = event.dataTransfer?.files.item(0) ?? null;
    } else {
      this.file = (event as HTMLInputElement).files?.item(0) as File;
    }

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    try {
      this.screenshots = await this.ffmpegService.getScreenshots(this.file);
      if (this.selectedImagePath == '') {
        this.selectedImagePath = this.screenshots[0];
      }
    } catch (error) {
      console.log(error);
    }
    this.fileName = this.file.name;
    /**
     * uploading file
     */
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const screenshotBlob = await this.ffmpegService.blobFromUrl(
      this.selectedImagePath
    );
    const screenshotPath = `screenshots/${clipFileName}.png`;

    this.task = this.storage.upload(clipPath, this.file);

    const clipRef = this.storage.ref(clipPath);

    this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob);

    const screenshotRef = this.storage.ref(screenshotPath);
    combineLatest([
      this.task.percentageChanges(),
      this.screenshotTask?.percentageChanges(),
    ]).subscribe((progress) => {
      const [clipProgress, screenshotProgress] = progress;
      if (!clipProgress || !screenshotProgress) {
        return;
      }
      this.uploadingPercentage = ((clipProgress as number) +
        screenshotProgress) as number;
    });
    forkJoin([
      this.task.snapshotChanges(),
      this.screenshotTask.snapshotChanges(),
    ])
      .pipe(
        switchMap(() =>
          forkJoin([clipRef.getDownloadURL(), screenshotRef.getDownloadURL()])
        )
      )
      .subscribe({
        next: (urls) => {
          const [clipURL, screenshotURL] = urls;
          let clip: Clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.fileName,
            fileName: `${clipFileName}.mp4`,
            url: clipURL,
            thumbnail: screenshotURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            screenshotFileName: `${clipFileName}.png`,
          };
          this.uploadedClipData = clip;
          this.uploadStatus = {
            status: 'success',
            color: 'green',
            message: 'the video is uploaded successfully.',
          };
        },
        error: (error) => {
          console.log(error);
          this.uploadStatus = {
            status: 'error',
            color: 'red',
            message: 'the file size is more than 10 MB.',
          };
          this.uploadingPercentage = 0;
        },
      });
    setTimeout(() => {
      this.uploadStatus = null;
    }, 10000);
  };

  onUploadHandler = (form: NgForm) => {
    if (this.ffmpegService.isRunning) {
      return;
    }
    this.clipService.createClip(this.uploadedClipData as Clip);
    form.reset();
  };
}
