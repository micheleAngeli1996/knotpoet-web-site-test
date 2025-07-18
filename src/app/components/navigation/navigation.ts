import { Component, OnDestroy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, Footer],
  template: `
   <nav class="absolute top-0 left-0 right-0 z-20 p-6">
      <div class="flex justify-between items-center">
        <a href="/" class="text-white/80 hover:text-white transition-colors">
          <div class="w-8 h-8 border border-white/60 rounded-full flex items-center justify-center">
            <span class="text-sm font-light">KP</span>
          </div>
        </a>

        <div class="hidden md:flex space-x-8">
          @for(item of items; track $index) {
            <a class="text-white/70 hover:text-white transition-colors text-sm font-light tracking-wide"
            [routerLink]="item.href">
              {{item.label}}
            </a>
          }
        </div>

        <!-- Menu hamburger -->
        <div class="md:hidden">
          <button (click)="toggleMenu()" class="text-white/70 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div
            class="flex flex-col grow-1 fixed z-21 text-center transition-discrete inset-y-0 right-0 bg-black items-center shadow-lg transform transition-transform duration-300 z-50"
            [class]="!menuOpen() ? 'hidden' : 'w-full'"
          >
            <div class="p-6 text-xl font-bold border-b flex items-center justify-center space-x-2 w-full">
              <div class="w-full">Logo</div>
              <div class="cursor-pointer absolute right-5" (click)="toggleMenu()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div class="flex flex-col grow-1 justify-center space-y-4 p-6 w-full">
              @for(item of items; track $index) {
                <a (click)="toggleMenu()" class="text-white/70 hover:text-white transition-colors text-sm font-light tracking-wide"
                  [routerLink]="item.href">
                  {{item.label}}
                </a>
              }
            </div>

            <div>
              <app-footer></app-footer>
            </div>
          </div>
        </div>
      </div>
   </nav>
  `,
  styleUrl: './navigation.css'
})
export class Navigation implements OnDestroy{
  menuOpen = signal(false);

  readonly items = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/news", label: "News" }
  ];

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  ngOnDestroy() {
    this.menuOpen.set(false);
  }
}
