import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";
import { Footer } from "./components/footer/footer";
import { Message } from "./components/message/message";
import { Galaxy } from "./components/galaxy/galaxy";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer, Message, Galaxy],
  template: `
  <app-galaxy></app-galaxy>
  <div>
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
