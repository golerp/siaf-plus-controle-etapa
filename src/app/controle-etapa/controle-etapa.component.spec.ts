import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemEtapaComponent } from './controle-etapa.component';

describe('OrdemEtapaComponent', () => {
  let component: OrdemEtapaComponent;
  let fixture: ComponentFixture<OrdemEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdemEtapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdemEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
