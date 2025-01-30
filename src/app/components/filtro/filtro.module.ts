import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroComponent } from './filtro.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FiltroRoutingModule } from './filtro-routing.module';
import { ChipsModule } from 'primeng/chips';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [FiltroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    FiltroRoutingModule,
    ChipsModule,
    SharedModule,
]
})
export class FiltroModule { }
