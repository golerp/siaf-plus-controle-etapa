import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControleEtapaComponent } from './controle-etapa.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ControleEtapaRoutingModule } from './controle-etapa-routing.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ChipsModule } from 'primeng/chips';
import { SharedModule } from '../components/shared.module';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogBaseComponent } from '../components/dialog/dialog-base.component';
// import { TextareaModule } from 'primeng/textarea';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        ControleEtapaRoutingModule,
        ChipsModule,
        SharedModule,
        DialogModule,
        DynamicDialogModule
    ],
    declarations: [ControleEtapaComponent, DialogBaseComponent],
    providers: [DialogService, DatePipe]
})
export class ControleEtapaModule { }
