import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginFacialComponent } from './login-facial.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginFacialComponent },
        { path: 'cadastrar/:id', component: LoginFacialComponent }
    ])],
    exports: [RouterModule]
})
export class LoginFacialRoutingModule { }
