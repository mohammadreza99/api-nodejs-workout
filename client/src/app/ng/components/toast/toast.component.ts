import { Component, OnInit } from '@angular/core';
import { NgToastOptions } from '@ng/models/overlay';

@Component({
  selector: 'ng-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  constructor() {}

  options = new NgToastOptions();

  ngOnInit() {}
}
