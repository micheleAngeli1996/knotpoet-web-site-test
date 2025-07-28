import { Component, computed, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-message',
  imports: [],
  template: `
    @if(message(); as msg) {
      @let type = msg?.type;
      <div @fadeInOut class="flex items-center justify-between {{type === 'success' ? 'bg-green-50 border-green-200' : (type === 'error' ?'bg-red-50 border-red-200' : 'bg-indigo-50 border-indigo-200')}} border text-sm p-4 rounded-md w-full max-w-3xl">
        <div class="flex items-center gap-2">
          <!-- Icona di spunta -->
          <div class="text-white {{type === 'success' ? 'bg-green-500 border-green-200' : (type === 'error' ? 'bg-red-500 border-red-200' : 'bg-indigo-500 border-indigo-200')}} p-02 border rounded-full">
            @switch (type) {
              @case ('success') {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              }
              @case ('error') {
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              }
              @case ('info') {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              }
            }
          </div>
          <!-- Testo -->
          <span class="{{type === 'success' ? 'text-green-700' : (type === 'error' ? 'text-red-700' : 'text-indigo-700')}} font-semibold">{{msg?.text}}</span>
        </div>
        <!-- Pulsante di chiusura -->
        <button class="{{type === 'success'? 'text-green-500 hover:bg-green-600/75' : (type ==='error' ? 'text-red-500 hover:bg-red-600/75': 'text-indigo-500 hover:bg-indigo-600/75')}}
            p-1 rounded-full shadow-none cursor-pointer transition duration-300 ease-in-out hover:text-white" (click)="messageService.clear()">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </button>
      </div>

    }
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ],
  styles: `.p-02 {
    padding: 0.2rem;
    }`
})
export class Message {
  messageService = inject(MessageService);
  readonly message = computed(() => this.messageService.message());
}
