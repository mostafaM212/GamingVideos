import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  ngOnInit(): void {}
  openModal = ($event: Event): void => {
    $event.preventDefault();
    this.modalService.toggleModal('auth');
  };

  onLogout = ($event: Event): void => {
    $event?.preventDefault();
    try {
      this.authService.logout();
    } catch (error) {
      console.log(error);
    }
  };
}
