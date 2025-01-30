import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdemEtapaComponent } from './ordem-etapa.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrdemEtapaComponent }
    ])],
    exports: [RouterModule]
})
export class OrdemEtapaRoutingModule { }
