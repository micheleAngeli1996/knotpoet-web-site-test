import { Component, computed, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  imports: [],
  template: `
    @if(message()) {
      @let type = message()?.type;
      <div class="flex items-center justify-between {{type === 'success' ? 'bg-success-50 border-success-200' : (type === 'error' ?'bg-error-50 border-error-200' : 'bg-indingo-50 border-indingo-200')}} border text-sm p-4 rounded-md w-full max-w-3xl">
        <div class="flex items-center gap-2">
          <!-- Icona di spunta -->
          <div class="text-white {{type === 'success' ? 'bg-success-500 border-success-200' : (type === 'error' ? 'bg-error-500 border-error-200' : 'bg-indingo-500 border-indingo-200')}} p-02 border rounded-full">
            @switch (type) {
              @case ('success') {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>;
              }
              @case ('error') {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>;
              }
              @case ('info') {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>;
              }
            }
          </div>
          <!-- Testo -->
          <span class="{{type === 'success' ? 'text-success-700' : (type === 'error' ? 'text-error-700' : 'text-indingo-700')}} font-semibold">{{message()?.text}}</span>
        </div>
        <!-- Pulsante di chiusura -->
        <button class="{{type === 'success'? 'text-success-500 hover:bg-success-600/75' : (type ==='error' ? 'text-error-500 hover:bg-error-600/75': 'text-indingo-500 hover:bg-indingo-600/75')}} shadow-none cursor-pointer transition duration-300 ease-in-out">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </button>
      </div>

    }
  `,
  styles: `.p-02 {
    padding: 0.2rem;
    }`
})
export class Message {
  private messageService = inject(MessageService);
  readonly message = computed(() => this.messageService.message());
}
