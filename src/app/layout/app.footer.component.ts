import { Component, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { FooterService } from './service/app.footer.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent implements OnInit {
    selectedButton: string | null = 'home';

    constructor(public layoutService: LayoutService, private footerService: FooterService) { }

    ngOnInit(): void {
        this.footerService.selectedButton$.subscribe(button => {
          this.selectedButton = button;
        });
    }

    selectButton(button: string): void {
        this.selectedButton = button;
        this.footerService.setSelectedButton(button);
    }

    isSelected(button: string): boolean {
        return this.selectedButton === button;
    }
}
