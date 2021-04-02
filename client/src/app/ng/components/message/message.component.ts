import { Component, OnInit } from '@angular/core';
import { NgMessage, NgMessageOptions } from '@ng/models/overlay';

@Component({
  selector: 'ng-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor() {}

  messages: NgMessage[] = [];
  options = new NgMessageOptions();

  ngOnInit() {}

  show(message: NgMessage[] | NgMessage) {
    this.messages = [];
    if (Array.isArray(message)) {
      for (const m of message) {
        let _message = new NgMessage();
        Object.assign(_message, m);
        this.messages.push(_message);
      }
    } else {
      let _message = new NgMessage();
      Object.assign(_message, message);
      this.messages.push(_message);
    }
  }
}
