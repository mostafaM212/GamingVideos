import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input('tabTitle') tabTitle: string = '';
  @Input('activeTab') active: boolean = false; 
  constructor() {}

  ngOnInit(): void {}
}
