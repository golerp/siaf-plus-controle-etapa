import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EtapaService } from '../service/etapa.service';
import { Stage } from '../models/stage';

@Component({
  selector: 'app-filter',
  templateUrl: './app.filtro.component.html',
  styleUrls: ['./app.filtro.component.scss']
})
export class AppFilterComponent implements OnInit {
  stages: any[] = [];
  selectedStages: Record<number, boolean> = {};
  modalResponse: any;
  numbers: number[] = [];

  constructor(private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private etapaService: EtapaService
  ) {}

  ngOnInit(): void {
    const data = this.dialogConfig.data;

    if (data?.numeroDocumento) {
      this.numbers = data.numeroDocumento;
    }

    this.etapaService.getAll().subscribe({
      next: (res) => {
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
      error: (err) => {
        console.log(err)
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {3
    this.modalResponse = {
      numeroDocumento: this.numbers,
      etapas: Object.entries(this.selectedStages)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key) 
      };
      
    this.dialogRef.close(this.modalResponse);
  }

  toggleStage(stage: Stage) {
    this.selectedStages[stage.id] = !this.selectedStages[stage.id];
  }

  processNumbers() {
    console.log('Números adicionados:', this.numbers);
  }
}