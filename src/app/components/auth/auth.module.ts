import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
