import {Component, Input} from '@angular/core';
import {Message} from "../../models/message.model";

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html'
})
export class MessageBoxComponent {

  @Input() message: Message;
  @Input() isFromSender: boolean;

  constructor() {}

}
