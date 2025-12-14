import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'social-proof-section',
  standalone: true,
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  imports: [CommonModule]
})
export class SocialProofSection {
  slides = [0, 1, 2, 3];
  currentIndex = 0;
  itemsPerView = 2; // default to 2 per view
  autoplayId?: any;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  // swipe/pointer
  private pointerDown = false;
  private startX = 0;
  private currentX = 0;
  private threshold = 60; // px to trigger swipe

  ngOnInit() {
    const width = this.isBrowser ? window.innerWidth : 1024;
    this.applyResponsiveItemsPerView(width);
    if (this.isBrowser) {
      this.startAutoplay();
    }
  }
  ngOnDestroy() {
    if (this.isBrowser) {
      this.stopAutoplay();
    }
  }

  setItemsPerView(n: 1 | 2) {
    this.itemsPerView = n;
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex());
  }
  maxIndex() {
    return Math.max(0, this.slides.length - this.itemsPerView);
  }
  next() {
    const step = this.itemsPerView;
    const nextIndex = this.currentIndex + step;
    this.currentIndex = nextIndex > this.maxIndex() ? 0 : nextIndex;
  }
  prev() {
    const step = this.itemsPerView;
    const prevIndex = this.currentIndex - step;
    this.currentIndex = prevIndex < 0 ? this.maxIndex() : prevIndex;
  }

  // advance a single slide (used to play 2 slides sequentially)
  nextSingle() {
    const nextIndex = this.currentIndex + 1;
    this.currentIndex = nextIndex > this.maxIndex() ? 0 : nextIndex;
  }

  // Play two slides in sequence slowly: first slide, then after a pause the second
  playTwoInSequence() {
    // first
    this.nextSingle();
    // schedule second after the transition time + small pause
    setTimeout(() => {
      this.nextSingle();
    }, 1200);
  }
  goTo(i: number) {
    this.currentIndex = Math.max(0, Math.min(i, this.maxIndex()));
  }

  get positions() {
    return new Array(this.maxIndex() + 1);
  }

  startAutoplay() {
    this.stopAutoplay();
    // every 7s start the slow two-step advance
    this.autoplayId = setInterval(() => this.playTwoInSequence(), 7000);
  }
  stopAutoplay() {
    if (this.autoplayId) { clearInterval(this.autoplayId); }
  }

  // adjust items per view responsively
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    if (!this.isBrowser) return;
    const width = (event.target as Window).innerWidth;
    this.applyResponsiveItemsPerView(width);
  }

  private applyResponsiveItemsPerView(width: number) {
    const desired = width <= 768 ? 1 : 2;
    if (this.itemsPerView !== desired) {
      this.setItemsPerView(desired as 1 | 2);
    }
  }

  // Pointer / touch handlers for swipe
  onPointerDown(event: PointerEvent) {
    if (!this.isBrowser) return;
    this.pointerDown = true;
    this.startX = event.clientX;
    this.currentX = this.startX;
    (event.target as Element).setPointerCapture?.(event.pointerId);
    this.stopAutoplay();
  }
  onPointerMove(event: PointerEvent) {
    if (!this.isBrowser || !this.pointerDown) return;
    this.currentX = event.clientX;
  }
  onPointerUp(event: PointerEvent) {
    if (!this.isBrowser || !this.pointerDown) return;
    this.pointerDown = false;
    const delta = this.startX - this.currentX;
    if (Math.abs(delta) > this.threshold) {
      if (delta > 0) { // left swipe -> next
        this.next();
      } else { // right swipe -> prev
        this.prev();
      }
    }
    this.startAutoplay();
  }
}
