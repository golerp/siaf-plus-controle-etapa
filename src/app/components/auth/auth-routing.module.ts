import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'facial', loadChildren: () => import('./login-facial/login-facial.module').then(m => m.LoginFacialModule) },
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
