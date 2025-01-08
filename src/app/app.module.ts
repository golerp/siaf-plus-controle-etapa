import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AppLayoutModule } from './layout/app.layout.module';
import { MessageService } from 'primeng/api';
import { NotfoundComponent } from './notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    AppLayoutModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule
  ],
  providers: [ { provide: LocationStrategy, useClass: PathLocationStrategy }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
