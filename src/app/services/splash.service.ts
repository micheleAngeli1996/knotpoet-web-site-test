import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SplashService {
  private showSplashSubject = new BehaviorSubject<boolean>(true);
  public showSplash$ = this.showSplashSubject.asObservable();

  private hasShownSplash = false

  constructor() {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      this.hasShownSplash = true;
      this.showSplashSubject.next(false);
    }
  }

  hideSplash(): void {
    this.showSplashSubject.next(false);
    this.hasShownSplash = true;
    sessionStorage.setItem("splashShown", "true");
  }

  shouldShowSplash(): boolean {
    return !this.hasShownSplash;
  }
}
