import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdemEtapaComponent } from './ordem-etapa.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { OrdemEtapaRoutingModule } from './ordem-etapa-routing.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ChipsModule } from 'primeng/chips';
import { SharedModule } from '../components/shared.module';

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
        OrdemEtapaRoutingModule,
        ChipsModule,
        SharedModule
    ],
    declarations: [OrdemEtapaComponent],
    providers: [DialogService, DatePipe]
})
export class OrdemEtapaModule { }
