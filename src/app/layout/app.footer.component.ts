import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { CommunicationService } from '../service/communication.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    constructor(public layoutService: LayoutService) { }

    // emitFooterEvent() {
    //     this.communicationService.emitFooterEvent('Footer event triggered');
    // }
}
