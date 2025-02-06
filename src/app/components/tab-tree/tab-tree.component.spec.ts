import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTreeComponent } from './tab-tree.component';

describe('TabTreeComponent', () => {
  let component: TabTreeComponent;
  let fixture: ComponentFixture<TabTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
