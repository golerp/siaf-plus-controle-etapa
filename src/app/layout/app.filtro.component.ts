import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-filter',
  templateUrl: './app.filtro.component.html',
  styleUrls: ['./app.filtro.component.scss']
})
export class AppFilterComponent implements OnInit {
  stages: string[] = ['Peritagem', 'Usinagem', 'Corte', 'Lavagem', 'Bobinagem', 'Verniz', 'Montagem'];
  selectedStages: string[] = [];
  numbers: number[] = [];

  constructor(private dialogRef: DynamicDialogRef) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    console.log('Ordem confirmada:', );
    this.dialogRef.close();
  }

  toggleStage(stage: string) {
    if (this.selectedStages.includes(stage)) {
      this.selectedStages = this.selectedStages.filter(s => s !== stage);
    } else {
      this.selectedStages.push(stage);
    }

    console.log('Etapas selecionadas:', this.selectedStages);
  }

  processNumbers() {
    console.log('Números adicionados:', this.numbers);
  }
}