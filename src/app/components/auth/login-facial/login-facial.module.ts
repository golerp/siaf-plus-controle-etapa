import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFacialRoutingModule } from './login-facial-routing.module';
import { LoginFacialComponent } from './login-facial.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { WebcamModule } from 'ngx-webcam';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
    imports: [
        CommonModule,
        LoginFacialRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        WebcamModule,
        InputSwitchModule,
    ],
    declarations: [LoginFacialComponent],
    providers: [
    ]
})
export class LoginFacialModule { }
