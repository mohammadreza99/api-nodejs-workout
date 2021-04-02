import { Component, OnInit } from '@angular/core';
import { NgConfirmOptions } from '@ng/models/overlay';

@Component({
  selector: 'ng-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor() {}
  options = new NgConfirmOptions();
  ngOnInit() {
  }
}
