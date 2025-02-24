import { Component, OnInit } from '@angular/core';
import { OrdemServico } from '../models/ordem-servico';
import { Router } from '@angular/router';
import { Priority } from 'src/app/base/priority.enum';
import { OrdemStatus } from 'src/app/base/ordem-status.enum';
import { DatePipe, JsonPipe } from '@angular/common';
import { EtapaService } from '../service/etapa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-controle-etapa',
  templateUrl: './controle-etapa.component.html',
  styleUrl: './controle-etapa.component.scss'
})
export class ControleEtapaComponent {
  modelo: OrdemServico;
  tabTree: boolean = false;
  etapaIniciada: boolean = false;
  informacoes: { campo1: any, valor1: any, campo2: any, valor2: any }[] = [];

  constructor(private router: Router, 
    private etapaService: EtapaService,
    private messageService: MessageService,
    private datePipe: DatePipe) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.modelo = state['ordem'] as OrdemServico;

    if (this.modelo) {
      this.informacoes = this.mapearInformacoes(this.modelo);
    }
  }

  voltar() {
    window.location.href = '/inicio';
  }

  private mapearInformacoes(ordem: OrdemServico) {
    return [
      { campo1: 'Status',       valor1: OrdemStatus[ordem.status], campo2: 'Prioridade',     valor2: Priority[ordem.prioridade] },
      { campo1: 'Etapa atual',  valor1: 'ordem.etapaAtual',   campo2: 'Próxima etapa',  valor2: 'ordem.proximaEtapa' },

      { campo1: 'Posto de atendim.', valor1: 'ordem.postoAtendim.',            campo2: 'Responsável',      valor2: 'ordem.responsavel' },
      { campo1: 'Data de abertura',     valor1: this.formatData(ordem.dataAbertura), campo2: 'Data de previsão', valor2: this.formatData(ordem.dataPrevisao) },
    ];
  }

  formatData(valor: Date | undefined) {
    return this.datePipe.transform(valor, 'dd/MM/yyyy')
  }

  acaoEtapa(action: string) {
    // Implementar
    // const payload = {
    //   ofcOrdemServicoId: this.modelo.id,
    //   atual: true,
    //   acao: action
    // }

    // this.etapaService.iniciarEtapa(payload).subscribe({
    //   next: (res: any) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Sucesso',
    //       detail: action == 'iniciar' ? 'Etapa iniciada.' : 'Etapa Finalizada',
    //     });
    //     this.etapaIniciada = true;
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Erro',
    //       detail: err,
    //     });
    //   },
    // });
  }
}
