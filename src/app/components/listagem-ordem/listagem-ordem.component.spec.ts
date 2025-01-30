import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemOrdemComponent } from './listagem-ordem.component';

describe('ListagemOrdemComponent', () => {
  let component: ListagemOrdemComponent;
  let fixture: ComponentFixture<ListagemOrdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemOrdemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
