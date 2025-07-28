import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";
import { Footer } from "./components/footer/footer";
import { Message } from "./components/message/message";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer, Message],
  template: `
  <div class="cosmic-background">
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
export class App {
  protected readonly title = signal('knotpoet-site-test');
}
