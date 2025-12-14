import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'hero-section',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroSection implements AfterViewInit {
  @ViewChild('ctaBtn') ctaBtn!: ElementRef<HTMLAnchorElement>;
  @ViewChild('badgesRow') badgesRow!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    // sync immediately after view render
    setTimeout(() => this.syncCtaWidth(), 0);
  }

  @HostListener('window:resize')
  onResize() { this.syncCtaWidth(); }

  private syncCtaWidth() {
    if (!this.ctaBtn || !this.badgesRow) return;
    const badgesWidth = Math.ceil(this.badgesRow.nativeElement.getBoundingClientRect().width);
    if (badgesWidth > 0) {
      // respect a safe viewport max width via CSS; set explicit px width for exact alignment
      this.ctaBtn.nativeElement.style.width = badgesWidth + 'px';
    }
  }
}
