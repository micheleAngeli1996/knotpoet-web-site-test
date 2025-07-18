import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  template: `
    <footer class="relative z-10 p-6 text-center">
      <div class="flex flex-row grow-1 justify-center space-x-2 w-full">
        @for(item of items; track $index) {
          <a class="text-white/70 hover:text-white transition-colors text-sm font-light tracking-wide"
            [routerLink]="item.href">
            {{item.label}}
          </a>
        }
      </div>

      <div class="flex justify-center space-x-6 my-4">
        <a
          href="https://instagram.com/knotpoet_"
          class="text-white/60 hover:text-white transition-colors"
          aria-label="Instagram"
          target="_blank"
        >
          <img src="img/icons/social/instagram.svg"  class="w-5 h-5" />
        </a>
        <a
          href="https://facebook.com"
          class="text-white/60 hover:text-white transition-colors"
          aria-label="Facebook"
          target="_blank"
        >
          <img src="img/icons/social/facebook.svg"  class="w-5 h-5" />
        </a>
        <a
          href="https://spotify.com"
          class="text-white/60 hover:text-white transition-colors"
          aria-label="Spotify"
          target="_blank"
        >
          <img src="img/icons/social/spotify.svg"  class="w-5 h-5" />
        </a>
        <a
          href="https://youtube.com"
          class="text-white/60 hover:text-white transition-colors"
          aria-label="YouTube"
          target="_blank"
        >
          <img src="img/icons/social/youtube.svg"  class="w-5 h-5" />
        </a>
      </div>

      <div class="text-white/50 text-xs space-x-4">
        <span>© 2025 Knot Poet</span>
        <span>|</span>
        <a (click)="openPrivacy()" target="_blank" class="hover:text-white/70 transition-colors cursor-pointer">
          Privacy Policy
        </a>
      </div>
    </footer>
  `,
  styleUrl: './footer.css'
})
export class Footer {
  private router = inject(Router);
  readonly items = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/news", label: "News" }
  ];

  openPrivacy() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/privacy'])
    );

    window.open(url, '_blank');
  }
}
