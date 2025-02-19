import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  selectedCard: number | undefined = undefined;

  @Output() cardSelected = new EventEmitter<number | undefined>();

  cards = [
    { label: 'Novo', color: '#6360FF', status: 1 },
    { label: 'Aguardando', color: '#FFC960', status: 0 },
    { label: 'Em Andamento', color: '#6360FF', status: 2 },
    { label: 'Finalizado', color: '#34C759', status: 4 }
  ];


  selectCard(index: number): void {
    if (this.selectedCard === index) {
      this.selectedCard = undefined;
      this.cardSelected.emit(undefined);
    } else {
      this.selectedCard = index;
      this.cardSelected.emit(this.cards[index].status);
    }
  }
  
}
