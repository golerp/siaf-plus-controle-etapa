import { Component, OnInit } from '@angular/core';
import { OrdemServico } from '../models/ordem-servico';
import { Router } from '@angular/router';
import { Priority } from 'src/app/base/priority.enum';
import { OrdemStatus } from 'src/app/base/ordem-status.enum';
import { OrcamentoStatus } from '../base/orcamento-status.enum';
import { DatePipe, JsonPipe } from '@angular/common';
import { EtapaService } from '../service/etapa.service';
import { MessageService } from 'primeng/api';
import { OrcamentoServico } from '../models/orcamento';
import { LinhaEtapa } from '../models/linha-etapa';

@Component({
  selector: 'app-controle-etapa',
  templateUrl: './controle-etapa.component.html',
  styleUrl: './controle-etapa.component.scss'
})
export class ControleEtapaComponent implements OnInit {
  modelo: OrdemServico | OrcamentoServico;
  tabTree: boolean = false;
  etapaIniciada: boolean = false;
  linhaEtapa: LinhaEtapa | undefined;
  informacoes: { campo1: any, valor1: any, campo2: any, valor2: any }[] = [];
  dialogVisible: boolean = false;
  dialogAberto: string | null = null;
  dadosDialog: any = {
    titulo: '',
    conteudo: {}
  };

  constructor(private router: Router, 
    private etapaService: EtapaService,
    private messageService: MessageService,
    private datePipe: DatePipe) {
      const state = this.router.getCurrentNavigation()?.extras.state || {};
      this.modelo = state['documento'] as OrdemServico | OrcamentoServico;
  
      if (this.modelo) {
        this.informacoes = this.modelo.orcamento ? this.mapearInformacoesOrcamento(this.modelo) : this.mapearInformacoesOrdem(this.modelo);
      }
    }

  ngOnInit(): void {
    let ofcTipoEquipamentoId: number;
    if (this.modelo.ofcEquipamento && this.modelo.ofcEquipamento.tipoEquipamentoId) {
      ofcTipoEquipamentoId = this.modelo.ofcEquipamento.tipoEquipamentoId;

      this.etapaService.getLinhaEtapa(ofcTipoEquipamentoId).subscribe({
        next: (res: any) => {
          this.linhaEtapa = res[0];
          console.log(this.linhaEtapa)
        }
      });
    } else {
      this.messageService.add({
        severity: 'warning',
        summary: 'Aviso!',
        detail: 'Não foi possível identificar o tipo de equipamento.',
      });
    }
  }

  formatarData(data: Date | string | null | undefined): string {
    return this.datePipe.transform(data || new Date(), 'dd/MM/yyyy')!;
  }
  
  abrirDialog(tipo: string) {
    this.dadosDialog.titulo = '';
    switch(tipo) {
      case 'equipamento':
        this.dadosDialog.titulo = 'Equipamento';
        break;
      case 'cliente':
        this.dadosDialog.titulo = 'Cliente';
        break;
      case 'infoComplementar':
        this.dadosDialog.titulo = 'Info. Complementares';
        break;
      case 'anexo':
        this.dadosDialog.titulo = 'Anexos';
        break;
    }
    this.dialogVisible = true;
  }

  voltar() {
    window.location.href = '/inicio';
  }

  private mapearInformacoesOrdem(ordem: OrdemServico) {
    return [
      { campo1: 'Status',       valor1: OrdemStatus[ordem.status], campo2: 'Prioridade',     valor2: Priority[ordem.prioridade] },
      { campo1: 'Etapa atual',  valor1: 'ordem.etapaAtual',   campo2: 'Próxima etapa',  valor2: 'ordem.proximaEtapa' },

      { campo1: 'Posto de atendim.', valor1: 'ordem.postoAtendim.',            campo2: 'Responsável',      valor2: 'ordem.responsavel' },
      { campo1: 'Data de abertura',     valor1: this.formatData(ordem.dataAbertura), campo2: 'Data de previsão', valor2: this.formatData(ordem.dataPrevisao) },
    ];
  }

  private mapearInformacoesOrcamento(documento: OrcamentoServico) {
    return [
      { campo1: 'Status',       valor1: OrcamentoStatus[documento.status], campo2: 'Prioridade',     valor2: Priority[documento.prioridade] },
      { campo1: 'Etapa atual',  valor1: 'ordem.etapaAtual',   campo2: 'Próxima etapa',  valor2: 'ordem.proximaEtapa' },

      { campo1: 'Posto de atendim.', valor1: 'ordem.postoAtendim.',            campo2: 'Responsável',      valor2: 'ordem.responsavel' },
      { campo1: 'Data de abertura',     valor1: this.formatData(documento.dataAbertura), campo2: 'Data de previsão', valor2: this.formatData(documento.dataEntrega) },
    ];
  }

  formatData(valor: Date | undefined) {
    return this.datePipe.transform(valor, 'dd/MM/yyyy')
  }

  acaoEtapa(action: string) {
    // this.tabTree = !this.tabTree;
    // Implementar

    const payload: LinhaEtapa = {
      intEmpresaId: 1,
      ofcOrdemServicoId: this.modelo.id,
      ofcLinhaEtapaFaseId: 1,
      ofcLinhaEtapaId: 1,
      situacao: 1,
      subetapa: false,
      logInicioPctUsuarioId: 1,
      logFimPctUsuarioId: 1,
    }

    this.etapaService.iniciarEtapa(payload).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: action == 'iniciar' ? 'Etapa iniciada.' : 'Etapa Finalizada',
        });
        this.etapaIniciada = true;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err,
        });
      },
    });
  }
}
