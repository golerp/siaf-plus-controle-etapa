import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  selectedCard: number | null = null;

  @Output() cardSelected = new EventEmitter<string>();

  cards = [
    { label: 'Novo', color: '#6360FF' },
    { label: 'Aguardando', color: '#FFC960' },
    { label: 'Em Andamento', color: '#6360FF' },
    { label: 'Finalizado', color: '#34C759' }
  ];


  selectCard(index: number): void {
    this.selectedCard = index;
    this.cardSelected.emit(this.cards[index].label);
  }
}
