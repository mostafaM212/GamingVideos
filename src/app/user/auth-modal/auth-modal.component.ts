import { trigger , state , style , transition , animate , keyframes} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  animations: [
    trigger('opacityAnimation', [
      state(
        'true',
        style({
          opacity: 1,
        })
      ),
      state(
        'false',
        style({
          opacity: 0,
        })
      ),
      transition('false<=>true', animate('200ms ease-in')),
    ]),
  ],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  
  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.register('auth');
    console.log(this.modalService.isModalOpen('auth') + '');
    
  }
  
  ngOnDestroy(): void {
    this.modalService.unregister('auth');
  }
}
