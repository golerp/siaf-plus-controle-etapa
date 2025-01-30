import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemOrdemComponent } from './listagem-ordem/listagem-ordem.component';

@NgModule({
  declarations: [ListagemOrdemComponent],
  imports: [CommonModule],
  exports: [ListagemOrdemComponent]
})
export class SharedModule {}
