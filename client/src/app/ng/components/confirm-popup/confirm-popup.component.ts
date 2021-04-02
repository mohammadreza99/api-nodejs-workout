import { Component, OnInit } from '@angular/core';
import { NgConfirmPopupOptions } from '@ng/models/overlay';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ng-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  constructor(private c: ConfirmationService) {}
  options = new NgConfirmPopupOptions();
  ngOnInit(): void {}
}
