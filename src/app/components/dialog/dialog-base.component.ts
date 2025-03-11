import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-base',
  template: `
    <p-dialog [header]="titulo" 
              [(visible)]="visible"
              (onHide)="onClose()"
              [style]="{width: '80vw', 'max-width': '800px'}"
              [responsive]="true"
              [modal]="true"
              [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
              [draggable]="false" [resizable]="false">
      <ng-content></ng-content>
    </p-dialog>
  `
})
export class DialogBaseComponent {
    @Input() titulo: string = '';
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();
  
    onClose() {
      this.visible = false;
      this.visibleChange.emit(this.visible);
    }
  }