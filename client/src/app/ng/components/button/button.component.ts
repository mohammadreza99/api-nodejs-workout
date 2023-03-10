import { Component, Input, OnInit } from '@angular/core';
import { NgPosition, NgSize } from '@ng/models/offset';
import { NgColor } from '@ng/models/color';
import { NgButtonAppearance, NgButtonType } from '@ng/models/button';

@Component({
  selector: 'ng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: { '[class.full]': 'full' },
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Input() label: string;
  @Input() icon: string;
  @Input() appearance: NgButtonAppearance;
  @Input() disabled: boolean = false;
  @Input() iconPos: NgPosition = 'left';
  @Input() type: NgButtonType = 'button';
  @Input() rounded: boolean = false;
  @Input() raised: boolean = false;
  @Input() color: NgColor = 'primary';
  @Input() full: boolean = false;
  @Input() badge: string | number;
  @Input() badgeColor: NgColor = 'primary';
  @Input() size: NgSize = 'md';

  ngOnInit(): void {}
}
