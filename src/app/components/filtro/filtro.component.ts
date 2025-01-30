import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service'; 
import { HomeService } from 'src/app/service/home.service'; 
import { Priority } from 'src/app/base/priority.enum'; 
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})

export class FiltroComponent implements OnInit {
  public windowWidth: number;
  public windowHeight: number;
  
  stages: string[] = ['Peritagem', 'Usinagem', 'Corte', 'Lavagem', 'Bobinagem', 'Verniz', 'Montagem'];
  selectedStages: string[] = [];
  numbers: number[] = [];

  selectedCardIndex: number | null = null;
  selectedButton: string | null = null;
  hoveredCardIndex: number | null = null;

  ordensServico: any[] = [];
  isLoading: boolean = false;
  skip = 0;
  isMobile: boolean = false;

  constructor(public layoutService: LayoutService,
    private homeService: HomeService,
    private dialogService: DialogService) {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
  }

  ngOnInit() {
    this.updateCardContainerHeight();
    this.loadMoreCards();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    this.windowHeight = event.target.innerHeight;
    this.updateCardContainerHeight();
  }

  updateCardContainerHeight(): void {
    if (this.windowWidth <= 480) {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 5rem)`);
    } else {
      document.documentElement.style.setProperty('--cards-container-height', `calc(100vh - 5rem)`);
    }
  }

  handleScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
  
    const tolerance = 5;

    if (scrollTop + clientHeight >= scrollHeight - tolerance) {
      this.loadMoreCards();
    }
  }

  loadMoreCards(): void {
    this.isLoading = true;
    this.homeService.getOrdens(10, this.skip).subscribe({
      next: (newOrdens: any) => {
        this.ordensServico = [...this.ordensServico, ...newOrdens.items];
        this.skip += newOrdens.items.length 
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onCardSelecionado(card: any): void {
    console.log(`Card selecionado: ${JSON.stringify(card)}`);
  }
}
