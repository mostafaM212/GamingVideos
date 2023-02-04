import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input('label') label: string = '';
  @Input('inputType') inputType: string = 'text';
  @Input('placeholder') placeholder: string = '';
  @Input('underText') underText: string = 'this field is required';
  @Input('control') control: FormControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {}
}
