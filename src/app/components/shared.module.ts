import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemOrdemComponent } from './listagem-ordem/listagem-ordem.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { TabTreeComponent } from './tab-tree/tab-tree.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [ListagemOrdemComponent, InfoCardComponent, TabTreeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    TableModule,
    TabViewModule,
    TreeModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    ChipsModule,
    InputTextModule,
    InputSwitchModule,
  ],
  exports: [ListagemOrdemComponent, InfoCardComponent, TabTreeComponent]
})
export class SharedModule {}
