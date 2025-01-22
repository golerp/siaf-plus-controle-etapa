import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { FooterService } from './service/app.footer.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    selectedButton: string | null = 'home';

    constructor(public layoutService: LayoutService, private footerService: FooterService) { }

    selectButton(button: string): void {
        this.selectedButton = button;
        this.footerService.setSelectedButton(button);
    }

    isSelected(button: string): boolean {
        return this.selectedButton === button;
    }
}
