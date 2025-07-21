import { Injectable, signal } from '@angular/core';
import { IMessage } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = signal<IMessage | null>(null);

  show(msg: IMessage) {
    this.message.set(msg);
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.message.set(null);
  }
}
