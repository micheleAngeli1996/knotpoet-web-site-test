import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer],
  template: `
  <!-- TODO: cosmic-background -->
  <div class="">
      <app-navigation />
      <router-outlet></router-outlet>
      <app-footer />
  </div>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('knotpoet-site-test');
}
