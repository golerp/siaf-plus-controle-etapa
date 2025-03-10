import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Stage } from 'src/app/models/stage';
import { EtapaService } from 'src/app/service/etapa.service';
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})

export class FiltroComponent implements OnInit {
  stages: any[] = [];
  selectedStages: Record<number, boolean> = {};
  modalResponse: any;
  numbers: number[] = [];

  constructor(private etapaService: EtapaService
  ) {}

  ngOnInit(): void {
    const data: { numeroDocumento?: number[], etapas?: number[] } = {}

    if (data?.numeroDocumento) {
      this.numbers = data.numeroDocumento;
    }

    this.etapaService.getAll().subscribe({
      next: (res: any) => {
        if (res && res.length) {
          this.stages = res.map((etapa: any) => ({
            id: etapa.id,
            descricao: etapa.descricao
          }));
        }

        if (data?.etapas) {
          this.selectedStages = data.etapas.reduce((acc: Record<number, boolean>, id: number) => {
            acc[id] = true;
            return acc;
          }, {});
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onCancel(): void {
  }

  onConfirm(): void {3
    this.modalResponse = {
      numeroDocumento: this.numbers,
      etapas: Object.entries(this.selectedStages)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key) 
      };
      
    console.log('Resposta do modal:', this.modalResponse);
  }

  toggleStage(stage: Stage) {
    this.selectedStages[stage.id] = !this.selectedStages[stage.id];
  }

  processNumbers() {
    console.log('Números adicionados:', this.numbers);
  }

  voltar() {
    window.location.href = '/inicio';
  }
}
