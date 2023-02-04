import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Clip } from 'src/app/models/Clip.model';
import { ModalService } from 'src/app/services/modal.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { UploadStatus } from '../upload/upload.component';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * properties
   */
  @Output('onUpdateClip') onUpdateClip: EventEmitter<Clip> = new EventEmitter();
  @Input('activeClip') activeClip: Clip | null = null;
  uploadStatus: UploadStatus | null = null;
  clipID = new FormControl('');
  title: FormControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  editForm: FormGroup = new FormGroup({
    title: this.title,
    id: this.clipID,
  });
  /**
   * constructor
   * @param modalService
   */
  constructor(
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.modalService.register('editClip');
    this.title.setValue(this.activeClip?.title);
  }
  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }
    this.title.setValue(this.activeClip.title);
    this.clipID.setValue(this.activeClip.docId as string);
  }

  onUpdate = async () => {
    try {
      await this.clipService.updateClip(
        this.clipID.value as string,
        this.title.value
      );
    } catch (error) {
      console.log(error);
      this.uploadStatus = {
        color: 'red',
        message: 'there is an error please try again later.',
        status: 'error',
      };
      return;
    }
    if (this.activeClip) {
      this.activeClip.title = this.title.value;
      this.onUpdateClip.emit(this.activeClip);
    }
    this.uploadStatus = {
      color: 'green',
      message: 'the clip is updated successfully.',
      status: 'success',
    };
    this.editForm.reset();
    setTimeout(() => {
      this.modalService.unregister('editClip');
    }, 1000);
  };

  ngOnDestroy(): void {
    this.modalService.unregister('editClip');
  }
}
