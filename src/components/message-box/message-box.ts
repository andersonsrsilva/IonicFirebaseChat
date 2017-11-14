import { Component } from '@angular/core';

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html'
})
export class MessageBoxComponent {

  text: string;

  constructor() {
    console.log('Hello MessageBoxComponent Component');
    this.text = 'Hello World';
  }

}
