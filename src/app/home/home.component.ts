import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../layout/service/app.layout.service';
import { FooterService } from '../layout/service/app.footer.service';
import { HomeService } from '../service/home.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AppFilterComponent } from '../layout/app.filtro.component';
import { Router } from '@angular/router';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public windowWidth: number;
  public windowHeight: number;
  
  selectedCardIndex: number | null = null;
  selectedButton: string | null = null;
  hoveredCardIndex: number | null = null;

  ordensServico = new BehaviorSubject<any[]>([]);
  isLoading: boolean = false;
  skip = 0;
  filtros: any;

  constructor(public layoutService: LayoutService,
    private homeService: HomeService,
    private router: Router,
    private dialogService: DialogService,
    private footerService: FooterService) {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.filtros = this.getStoredFilters();
  
    this.footerService.setSelectedButton('home');
    this.updateCardContainerHeight();
  
    if (!this.filtros) {
      this.loadMoreCards();
    } else {
      this.loadCardFilter(this.filtros);
    }
  
    this.footerService.selectedButton$.subscribe((button) => {
      this.selectedButton = button;
      const isLargeScreen = this.windowWidth > 480;
  
      if (button === 'search') {
        isLargeScreen ? this.openFilterModal() : this.router.navigate(['/filtro']);
      }
    });
  }
  

  private getStoredFilters(): any | null {
    const filtrosSalvos = localStorage.getItem('filtros');
    return filtrosSalvos ? JSON.parse(filtrosSalvos) : null;
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    this.windowHeight = event.target.innerHeight;
    this.updateCardContainerHeight();
  }

  updateCardContainerHeight(): void {
    if (this.windowWidth >= 769 && this.windowWidth <= 1024) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 17rem)`);
    } else if (this.windowWidth >= 481 && this.windowWidth <= 768) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 14rem)`);
    } else if (this.windowWidth <= 480) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 13rem)`);
    } else {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 15rem)`);
    }
  }

  handleCardSelected(cardLabel: string | null): void {
    console.log('Filtro selecionado:', cardLabel);

  }

  handleScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
  
    const tolerance = 5;

    if (scrollTop + clientHeight >= scrollHeight - tolerance && !this.filtros) {
      this.loadMoreCards();
    }
  }

  loadMoreCards(): void {
    this.isLoading = true;
    this.homeService.getOrdens(10, this.skip).subscribe({
      next: (newOrdens: any) => {
        const currentOrdens = this.ordensServico.getValue();
        this.ordensServico.next([...currentOrdens, ...newOrdens.items]);        
        this.skip += newOrdens.items.length 
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onCardSelecionado(card: any): void {
    this.router.navigate(['/ordem-etapa'], { state: { ordem: card } });
  }

  openFilterModal() {
    const ref = this.dialogService.open(AppFilterComponent, {
      width: '60%',
      styleClass: 'custom-dialog',
      closable: true,
      style: {
        'border-radius': '15px',
        'overflow': 'hidden',
      },
      data: {
        ...this.filtros
      },
    });

    ref.onClose.subscribe((filters) => {
      this.footerService.setSelectedButton('home');
    
      const hasValidFilters = filters && !Object.values(filters).every(value => Array.isArray(value) && value.length === 0);
    
      if (hasValidFilters) {
        this.filtros = filters;
        localStorage.setItem('filtros', JSON.stringify(filters));
        this.loadCardFilter(filters);
      } else if (hasValidFilters === false) {
        localStorage.removeItem('filtros');
        this.filtros = null;
        this.loadMoreCards();
      }
    });
  }

  loadCardFilter(filters: any): void {
    this.isLoading = true;
    const savedFilters = filters || JSON.parse(localStorage.getItem('filtros') || '{}');

    this.homeService.getOrdens(10, 0, savedFilters).subscribe({
      next: (ordens: any) => {
        this.ordensServico.next([...ordens.items]);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
