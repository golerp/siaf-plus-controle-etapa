import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FiltroComponent } from './filtro.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FiltroComponent }
    ])],
    exports: [RouterModule]
})
export class FiltroRoutingModule { }
