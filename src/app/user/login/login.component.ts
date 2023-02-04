import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form: NgForm | null = null;
  alertColor: string = '';
  alertMessage: string = '';
  showAlert: boolean = false;
  isSubmitted: boolean = false;
  constructor(
    private auth: AngularFireAuth,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}
  onSubmitHandler = async () => {
    this.isSubmitted = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.form?.value['email'],
        this.form?.value['password']
      );
      this.alertColor = 'green';
      this.alertMessage = 'You Logged in successfully';
      this.showAlert = true;
      this.modalService.unregister('auth');
    } catch (error) {
      console.log(error);
      this.alertColor = 'red';
      this.alertMessage =
        'Please make sure that you typed an email and password correctly';
      this.showAlert = true;
      this.isSubmitted = false;
    }
  };
}
