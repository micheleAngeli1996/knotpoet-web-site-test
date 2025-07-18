import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-dvh px-4">
      <h1 class="flickering-animation">404</h1>
      <h2>{{ 'pageNotFound' }}</h2>
      <button (click)="location.back()" class="inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-gradient-to-tr from-slate-800 to-slate-700 border-slate-800 text-slate-50 hover:brightness-105 text-white/80 hover:text-white transition-colors">Back to Home</button>
    </div>

  `,
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  location = inject(Location)

}
