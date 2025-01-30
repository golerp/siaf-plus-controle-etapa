import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority } from 'src/app/base/priority.enum'; 

@Component({
  selector: 'app-listagem-ordem',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listagem-ordem.component.html',
  styleUrls: ['./listagem-ordem.component.scss']
})
export class ListagemOrdemComponent {
  @Input() ordensServico: any[] = [];
  @Output() scrollEvent = new EventEmitter<Event>();
  @Output() cardSelecionado = new EventEmitter<any>();

  hoveredCardIndex: number | null = null;

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
