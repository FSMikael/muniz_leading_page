import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem { header: string; content: string }

@Component({
  selector: 'faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqSection implements AfterViewInit {
  @ViewChildren('panel') panels!: QueryList<ElementRef<HTMLElement>>;

  animDuration = 520;

  items: FaqItem[] = [
    {
      header: 'Sou MEI, preciso ter funcionários para contratar?',
      content: 'Na maioria das operadoras, não! Você pode contratar apenas para você e seus dependentes (cônjuge e filhos). Algumas operadoras pedem mínimo de 2 vidas, mas nós temos estratégias e parceiros que aceitam a partir de 1 vida. Faça a simulação que explicamos a melhor opção para seu caso.'
    },
    {
      header: 'Preciso ter o CNPJ aberto há quanto tempo?',
      content: 'A regra geral exige 3 meses de CNPJ ou 6 meses para MEI ativo. Porém, existem exceções e operadoras específicas que flexibilizam esse prazo ou aceitam empresas novas dependendo do porte. Converse com nossos consultores para avaliarmos sua elegibilidade.'
    },
    {
      header: 'Como funciona a carência? Vou poder usar o plano logo?',
      content: 'Esta é a grande vantagem do plano empresarial! Para consultas e exames simples, a carência costuma ser zero ou muito reduzida (frequentemente 24h para urgências). Para grupos a partir de 30 vidas, a isenção de carência costuma ser total. Também realizamos a compra de carência do seu plano anterior.'
    },
    {
      header: 'E o reajuste? Dizem que plano empresarial aumenta muito.',
      content: 'O reajuste PME é baseado no uso do grupo (sinistralidade). É aqui que entra nossa Gestão de Conta. Nós monitoramos seu contrato anualmente. Se a operadora propor um aumento injusto, nós atuamos para renegociar ou realizamos a portabilidade para outra seguradora. Você nunca fica refém.'
    },
    {
      header: 'Posso incluir meus pais, filhos ou parentes?',
      content: 'Sim! O plano empresarial permite a inclusão de dependentes diretos (cônjuges e filhos) e, em muitos casos, dependentes indiretos (pais, tios, netos), dependendo da regra de cada operadora. Nossa consultoria serve exatamente para encontrar a seguradora que aceita sua composição familiar.'
    }
  ];

  // open state per item (allows multiple open)
  openStates: boolean[] = [];

  // local map of panel heights (px)
  panelHeights: string[] = [];

  ngAfterViewInit(): void {
    // initialize heights and states
    this.panelHeights = this.items.map(() => '0px');
    this.openStates = this.items.map(() => false);
  }

  // toggle an item without closing others
  async toggle(i: number) {
    if (this.openStates[i]) {
      this.closePanel(i);
    } else {
      this.openPanel(i);
    }
  }

  openPanel(i: number) {
    const el = this.panels.toArray()[i]?.nativeElement;
    if (el) {
      const h = el.scrollHeight;
      this.panelHeights[i] = h + 'px';
      this.openStates[i] = true;
    } else {
      this.panelHeights[i] = '480px';
      this.openStates[i] = true;
    }
  }

  closePanel(i: number) {
    this.panelHeights[i] = '0px';
    this.openStates[i] = false;
  }

  wait(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
}
