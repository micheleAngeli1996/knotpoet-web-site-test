import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { ISubscribeForm, ISubscriber } from '../models/Subcription';
import { TranslateService } from '@ngx-translate/core';
import { FirestoreService } from './firestore.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private firestore = inject(Firestore);
  private translateService = inject(TranslateService);
  private firestoreService = inject(FirestoreService);
  private http = inject(HttpClient);

  getSubscriber(subscriberId: string) {
    return this.firestoreService.getDocById<ISubscriber>('subscribers', subscriberId);
  }

  async onSubmit(subscribeForm: FormGroup | undefined) {
    if (subscribeForm?.invalid) {
      return {
        isValid: false,
        status: ''
      };
    }

    try {
      const resp = await this.addSubscriber(subscribeForm?.value as ISubscribeForm);
      if (resp.id) {
        subscribeForm?.reset();
        this.getSubscriber(resp.id).subscribe(subscriber => {
          if (subscriber?.subscriptionToken) {
            this.sendMailToNewSubscriber(subscriber.subscriptionToken);
          }
        });
        return {
          isValid: true,
          status: 'success'
        };
      } else {
        return {
          isValid: true,
          status: 'error'
        };
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      return {
        isValid: true,
        status: 'error'
      };
    }
  }

  sendMailToNewSubscriber(subscribeToken: string) {
    this.http.get('https://www.knotpoet.com/api/sendMailNewSubscriber?token=' + subscribeToken).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error('Errore durante la registrazione:', error);
      },
      complete: () => {
        console.log('Completato');
      }
    });
  }

  async addSubscriber(subscribeForm: ISubscribeForm): Promise<DocumentReference> {
    const subscribersRef = collection(this.firestore, 'subscribers');

    return await addDoc(subscribersRef, {
      ...subscribeForm,
      subscribeToken: crypto.randomUUID(),
      timestamp: serverTimestamp(),
      subscribed: true,
      lang: this.translateService.currentLang || this.translateService.defaultLang
    });
  }
}
