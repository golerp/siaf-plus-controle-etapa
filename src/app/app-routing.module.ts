import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'auth/login', // Redireciona para login inicialmente
        pathMatch: 'full',
      },
      {
        path: '', component: AppLayoutComponent,
        // canActivate: [authGuard], // Protege as rotas
        children: [
            { path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
        ]
    },
      { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) }
    ],{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
