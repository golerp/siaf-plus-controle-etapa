import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../layout/service/app.layout.service';

@Component({
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    cards = [
        { title: 'Orders', count: 152, new: 24, icon: 'pi-shopping-cart', iconColor: 'text-blue-500', bgColor: 'bg-blue-100', status: 'new' },
        { title: 'Revenue', count: '$2,500', new: 150, icon: 'pi-dollar', iconColor: 'text-green-500', bgColor: 'bg-green-100', status: 'in-progress' },
        { title: 'Customers', count: 1200, new: 50, icon: 'pi-users', iconColor: 'text-orange-500', bgColor: 'bg-orange-100', status: 'completed' },
        { title: 'Feedback', count: 320, new: 10, icon: 'pi-comments', iconColor: 'text-purple-500', bgColor: 'bg-purple-100', status: 'pending' }
    ];

    constructor(public layoutService: LayoutService) {

    }

    ngOnInit() {

    }

    getRibbonColor(status: string): string {
        switch (status) {
          case 'new':
            return '#6360FF';
          case 'in-progress':
            return '#FFC960';
          case 'completed':
            return '#34C759';
          case 'pending':
            return '#FF5733';
          default:
            return '#6360FF';
        }
      }
}
