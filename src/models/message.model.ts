export class Message {

  public $key: string;

  constructor(public userId: string,
              public text: string,
              public timestamp: any) {
  }
}
