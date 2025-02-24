import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControleEtapaComponent } from './controle-etapa.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ControleEtapaComponent }
    ])],
    exports: [RouterModule]
})
export class ControleEtapaRoutingModule { }
