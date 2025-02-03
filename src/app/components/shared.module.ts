import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemOrdemComponent } from './listagem-ordem/listagem-ordem.component';
import { InfoCardComponent } from './info-card/info-card.component';

@NgModule({
  declarations: [ListagemOrdemComponent, InfoCardComponent],
  imports: [CommonModule],
  exports: [ListagemOrdemComponent, InfoCardComponent]
})
export class SharedModule {}
