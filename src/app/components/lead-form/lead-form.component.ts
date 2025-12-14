import { Component } from '@angular/core';

@Component({
  selector: 'lead-form-section',
  standalone: true,
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormSection {
  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'lead_submit',
      lead: payload
    });
    alert('Recebemos seus dados! Nossa consultora entrará em contato.');
    form.reset();
  }
}
