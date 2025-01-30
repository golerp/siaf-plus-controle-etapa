import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AppLayoutModule } from './layout/app.layout.module';
import { MessageService } from 'primeng/api';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './guard/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule, 
    ToastModule, 
    BrowserModule,
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
  ],
  providers: [ { provide: LocationStrategy, useClass: PathLocationStrategy }, MessageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
