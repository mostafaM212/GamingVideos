import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * constructor class
   */
  constructor(
    private authService: AuthService,
    private emailTaken: EmailTaken
  ) {}
  /**
    input controls list
  */
  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  email: FormControl = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),
  ]);
  confirmPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  age: FormControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  /***
    Register Form
  */
  RegisterForm: FormGroup = new FormGroup(
    {
      age: this.age,
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );
  /**
    class properties
  */
  showAlert: boolean = false;
  alertMessage: string = 'Please Wait Your Account is being created.';
  alertColor: string = 'blue';
  inSubmit: boolean = true;

  ngOnInit(): void {}

  onRegisterHandler = async () => {
    this.showAlert = true;
    this.inSubmit = false;

    try {
      await this.authService.createUser(this.RegisterForm.value as User);
    } catch (error) {
      console.log(error);
      this.alertMessage =
        'there is unexpected error occurred . please try again later.';
      this.alertColor = 'red';
      this.inSubmit = false;
      return;
    }
    this.alertMessage = 'Success! Your account has been created.';
    this.alertColor = 'green';
    this.inSubmit = true;
  };
}
