import { Component, OnInit } from '@angular/core';
import { Ordem } from '../models/ordem';
import { Router } from '@angular/router';
import { Priority } from 'src/app/base/priority.enum';
import { Status } from 'src/app/base/status.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ordem-etapa',
  templateUrl: './ordem-etapa.component.html',
  styleUrl: './ordem-etapa.component.scss'
})
export class OrdemEtapaComponent {
  ordemEtapa: Ordem;
  informacoesOrdem: { campo1: any, valor1: any, campo2: any, valor2: any }[] = [];

  constructor(private router: Router, private datePipe: DatePipe) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};

    this.ordemEtapa = state['ordem'] as Ordem;

    if (this.ordemEtapa) {
      this.informacoesOrdem = this.mapearInformacoesOrdem(this.ordemEtapa);
    }
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  private mapearInformacoesOrdem(ordem: Ordem) {
    return [
      { campo1: 'Status',       valor1: Status[ordem.status], campo2: 'Prioridade',     valor2: Priority[ordem.prioridade] },
      { campo1: 'Etapa atual',  valor1: 'ordem.etapaAtual',   campo2: 'Próxima etapa',  valor2: 'ordem.proximaEtapa' },

      { campo1: 'Posto de atendimento', valor1: 'ordem.postoAtendimento',            campo2: 'Responsável',      valor2: 'ordem.responsavel' },
      { campo1: 'Data de abertura',     valor1: this.formatData(ordem.dataAbertura), campo2: 'Data de previsão', valor2: this.formatData(ordem.dataPrevisao) },
    ];
  }

  formatData(valor: Date | undefined) {
    return this.datePipe.transform(valor, 'dd/MM/yyyy')
  }
}
