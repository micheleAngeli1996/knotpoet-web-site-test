import {inject, Injectable} from '@angular/core';
import {ApiEndpoints} from '../core/constants/api-endpoints';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  sendMail(contactForm: FormGroup): void {
    this.http.post(ApiEndpoints.sendMail, contactForm.value).subscribe({
      next: response => {
        console.log(response);
        contactForm.reset();
      },
      error: error => {
        console.error('Error sending mail:', error);
        this.messageService.show({type: 'error', text: 'An error occurred while sending the message'});
      },
      complete: () => {
        this.messageService.show({type: 'success', text: 'Your message has been sent'});
      }
    });
  }

}
