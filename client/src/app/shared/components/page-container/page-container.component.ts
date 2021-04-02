import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  @Input() header: string;

  constructor() {}

  ngOnInit(): void {}
}
