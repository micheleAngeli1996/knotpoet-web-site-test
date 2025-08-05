import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";
import { Footer } from "./components/footer/footer";
import { Message } from "./components/message/message";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer, Message],
  template: `
  <div class="cosmic-background">
    <div class="starfield" id="starfield"></div>
    <app-navigation />
    <router-outlet></router-outlet>
    <app-footer />
  </div>
  <div class="fixed right-0 bottom-0 p-4 z-11">
    <app-message />
  </div>
  `,
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('knotpoet-site-test');

  ngAfterViewInit(): void {
    const starCount = 5000;
    const starfield = document.getElementById("starfield");

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      const size = Math.random() * 1.5 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      const top = Math.random() * 200;
      const left = Math.random() * 200;

      star.style.top = `${top}%`;
      star.style.left = `${left}%`;

      // delay e durata diversi per ogni stella
      const delay = Math.random() * 5;
      const duration = 2 + Math.random() * 4;

      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;

      // parallax con z-index fittizio (depth)
      const z = Math.floor(Math.random() * 3);
      star.style.zIndex = z + '';

      starfield?.appendChild(star);
    }

    // shooting star ogni X secondi
    setInterval(() => {
      const shooting = document.createElement("div");
      shooting.classList.add("shooting-star");

      const startX = 100 + Math.random() * 50; // più a destra
      const startY = Math.random() * 50;       // metà in alto

      shooting.style.top = `${startY}%`;
      shooting.style.left = `${startX}%`;

      starfield?.appendChild(shooting);

      setTimeout(() => {
        shooting.remove();
      }, 1000); // dura come l’animazione
    }, 8000); // ogni 8 secondi (puoi variare)

  }
}
