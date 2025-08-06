import { Directive, ElementRef, input, Input, OnDestroy, OnInit } from '@angular/core';

export type ScrollRevealAnimation = 
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'rotate-in';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  appScrollReveal = input<ScrollRevealAnimation>('fade-in');
  delay = input<number>(0);
  threshold = input<number>(0.1);
  once = input<boolean>(true);

  private observer!: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupInitialState();
    this.createObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupInitialState() {
    const element = this.el.nativeElement;
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    element.style.transitionDelay = `${this.delay}ms`;
    
    // Set initial state based on animation type
    switch (this.appScrollReveal()) {
      case 'fade-in':
        element.style.opacity = '0';
        break;
      case 'slide-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px)';
        break;
      case 'slide-down':
        element.style.opacity = '0';
        element.style.transform = 'translateY(-60px)';
        break;
      case 'slide-left':
        element.style.opacity = '0';
        element.style.transform = 'translateX(60px)';
        break;
      case 'slide-right':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-60px)';
        break;
      case 'zoom-in':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        break;
      case 'zoom-out':
        element.style.opacity = '0';
        element.style.transform = 'scale(1.2)';
        break;
      case 'rotate-in':
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg) scale(0.9)';
        break;
    }
  }

  private createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!this.hasAnimated || !this.once) {
              this.animateIn();
              this.hasAnimated = true;
            }
          } else if (!this.once && this.hasAnimated) {
            this.animateOut();
          }
        });
      },
      {
        threshold: this.threshold(),
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animateIn() {
    const element = this.el.nativeElement;
    element.style.opacity = '1';
    element.style.transform = 'translate(0) scale(1) rotate(0)';
  }

  private animateOut() {
    if (!this.once) {
      this.setupInitialState();
    }
  }
}