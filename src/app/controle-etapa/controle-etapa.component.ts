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
import { LinhaEtapaFase } from '../models/linha-etapa-fase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-controle-etapa',
  templateUrl: './controle-etapa.component.html',
  styleUrl: './controle-etapa.component.scss'
})
export class ControleEtapaComponent implements OnInit {
  modelo: OrdemServico | OrcamentoServico;
  tabTree: boolean = false;
  etapaIniciada: boolean = false;
  faseAtual!: LinhaEtapaFase;
  proximaFase!: LinhaEtapaFase;
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
    }

  ngOnInit(): void {
    let ofcTipoEquipamentoId: number;
    if (this.modelo.ofcEquipamento && this.modelo.ofcEquipamento.tipoEquipamentoId) {
      ofcTipoEquipamentoId = this.modelo.ofcEquipamento.tipoEquipamentoId;

      this.etapaService.getLinhaEtapa(ofcTipoEquipamentoId).subscribe({
        next: (res: any) => {
          this.linhaEtapa = res[0];

          this.verificarLinhaEtapa();
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

  mapearInformacoesDocumento(documento: OrcamentoServico | OrdemServico, faseAtual: LinhaEtapaFase, proximaFase: LinhaEtapaFase) {
    return [
      { campo1: 'Status', valor1: documento.orcamento ? OrcamentoStatus[documento.status] : OrdemStatus[documento.status], campo2: 'Prioridade', valor2: Priority[documento.prioridade] },
      { campo1: 'Etapa atual',  valor1: faseAtual.ofcEtapa.descricao, campo2: 'Próxima etapa',  valor2: proximaFase.ofcEtapa.descricao },

      { campo1: 'Posto de atendim.', valor1: 'ordem.postoAtendim.',  campo2: 'Responsável',  valor2: 'ordem.responsavel' },
      { campo1: 'Data de abertura',  valor1: this.formatData(documento.dataAbertura), campo2: 'Data de previsão', valor2: this.formatData(documento.dataEntrega) },
    ];
  }

  formatData(valor: Date | undefined) {
    return this.datePipe.transform(valor, 'dd/MM/yyyy')
  }

  verificarLinhaEtapa() {
    if (this.modelo.orcamento) {
      if (!this.modelo.ofcControleEtapa) {
        let ordemFases = this.linhaEtapa?.ofcLinhaetapaFase || [];

        this.faseAtual   = ordemFases.find(x => x.ordem == 1 && !x.subetapa) as LinhaEtapaFase;
        this.proximaFase = ordemFases.find(x => x.ordem == 2 && !x.subetapa) as LinhaEtapaFase;
        this.informacoes = this.mapearInformacoesDocumento(this.modelo, this.faseAtual, this.proximaFase);
      } else {
        let ordemFases = this.linhaEtapa?.ofcLinhaetapaFase || [];
        let controleEtapa = this.modelo.ofcControleEtapa.find((x: any) => x.situacao == 1 /* TODO CRIAR INTERFACE PARA SITUACAO */)

        this.faseAtual   = ordemFases.find(x => x.id === controleEtapa.ofcLinhaetapaFaseId) as LinhaEtapaFase;
        this.proximaFase = ordemFases.find(x => x.ordem === this.faseAtual.ordem + 1 && !x.subetapa) as LinhaEtapaFase;
        this.informacoes = this.mapearInformacoesDocumento(this.modelo, this.faseAtual, this.proximaFase);
      }
    } else {
      let ordemFases = this.linhaEtapa?.ofcLinhaetapaFase || [];
      
      this.faseAtual   = ordemFases.find(x => x.id === this.modelo.ofcControleEtapa?.ofcLinhaEtapaFaseId) as LinhaEtapaFase;
      this.proximaFase = ordemFases.find(x => x.ordem === this.faseAtual.ordem + 1 && !x.subetapa) as LinhaEtapaFase;
      this.informacoes = this.mapearInformacoesDocumento(this.modelo, this.faseAtual, this.proximaFase);
    }
  }

  async acaoEtapa(action: string) {
    let subetapa = false;
    
    if (action === 'iniciar' && this.modelo.orcamento) {
      const result = await Swal.fire({
        title: 'Controle de Subetapa',
        text: 'Essa linha de etapa terá controle por subetapa?',
        icon: 'question',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      });

      subetapa = result.isConfirmed;
    }

    const payload: LinhaEtapa = {
      ofcOrdemServicoId: this.modelo.orcamento ? undefined : this.modelo.id,
      ofcOrcamentoId: this.modelo.orcamento ? this.modelo.id : undefined,
      ofcLinhaetapaFaseId: this.faseAtual.id,
      ofcLinhaetapaId: this.linhaEtapa?.id,
      situacao: action == 'iniciar' ? 1 : 0,
      subetapa,
      action,
      observacao: action == 'iniciar' ? "LINHA INICIADA" : "LINHA FINALIZADA",
    }

    this.etapaService.acaoControleEtapa(payload).subscribe({
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
