import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  constructor() {}
  @Input() message: string = 'موردی وجود ندارد.';

  ngOnInit(): void {}
}
