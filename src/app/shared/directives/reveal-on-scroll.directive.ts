import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[vmRevealDelay]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() vmRevealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.addClass(element, 'vm-reveal');
    this.renderer.setStyle(element, '--vm-reveal-delay', `${this.vmRevealDelay}ms`);

    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(element, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'is-visible');
            this.observer?.unobserve(element);
          }
        });
      },
      {
        root: null,
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}