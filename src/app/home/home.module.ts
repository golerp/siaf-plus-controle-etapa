import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HomeRoutingModule } from './home-routing.module';
import { StatusComponent } from '../components/status/status.component';
import { HomeService } from '../service/home.service';
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
        HomeRoutingModule,
        ChipsModule,
        SharedModule
    ],
    declarations: [HomeComponent, StatusComponent],
    providers: [DialogService]
})
export class HomeModule { }
