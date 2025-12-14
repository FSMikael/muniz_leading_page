import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSection } from './components/hero/hero.component';
import { PainSection } from './components/pain/pain.component';
import { LeadFormSection } from './components/lead-form/lead-form.component';
import { DiferencialSection } from './components/diferencial/diferencial.component';
import { SocialProofSection } from './components/social/social.component';
import { StepsSection } from './components/steps/steps.component';
import { FaqSection } from './components/faq/faq.component';
import { FooterSection } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroSection, PainSection, LeadFormSection, DiferencialSection, SocialProofSection, StepsSection, FaqSection, FooterSection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('muniz_leading_page');

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      necessidade: formData.get('necessidade')
    };
    // Basic tracking hook (replace with GTM/CRM integration)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'lead_submit', payload });
    console.log('Lead enviado', payload);
    alert('Pronto! Recebemos sua solicitação e entraremos em contato.');
    form.reset();
  }
}
