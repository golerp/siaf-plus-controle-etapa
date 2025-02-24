import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guard/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
      },
      {
        //utiliza componentes global como header e foter
        path: '', component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
        ]
      },
      { path: 'filtro', canActivate: [AuthGuard], loadChildren: () => import('./components/filtro/filtro.module').then(m => m.FiltroModule) },
      { path: 'ordem-etapa', canActivate: [AuthGuard], loadChildren: () => import('./controle-etapa/controle-etapa.module').then(m => m.ControleEtapaModule) },
      { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
      { path: '404', component: NotfoundComponent },
      { path: '**', redirectTo: '/404' },

    ],{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
