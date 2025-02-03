import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Priority } from 'src/app/base/priority.enum';

@Component({
  selector: 'app-listagem-ordem',
  templateUrl: './listagem-ordem.component.html',
  styleUrls: ['./listagem-ordem.component.scss']
})
export class ListagemOrdemComponent {
  @Input() ordensServico: any[] = [];
  @Output() scrollEvent = new EventEmitter<Event>();
  @Output() cardSelecionado = new EventEmitter<any>();

  public windowWidth: number;
  public windowHeight: number;
  hoveredCardIndex: number | null = null;

  constructor() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    this.windowHeight = event.target.innerHeight;
    this.updateCardContainerHeight();
  }

  updateCardContainerHeight(): void {
    if (this.windowWidth >= 769 && this.windowWidth <= 1024) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 17rem)`);
    } else if (this.windowWidth >= 481 && this.windowWidth <= 768) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 14rem)`);
    } else if (this.windowWidth <= 480) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 13rem)`);
    } else {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 15rem)`);
    }
  }

  selectCard(index: number): void {
    const selectedCard = this.ordensServico[index];
    this.cardSelecionado.emit(selectedCard);
  }

  getRibbonColor(status: string): string {
    switch (status.toString()) {
      case '0':
        return '#6360FF';
      case '1':
        return '#FFC960';
      case '2':
        return '#34C759';
      case '3':
        return '#FF5733';
      default:
        return '#6360FF';
    }
  }

  getPriorityLabel(priority: number): string {
    return Priority[priority];
  }

  onScroll(event: Event): void {
    this.scrollEvent.emit(event);
  }
}
