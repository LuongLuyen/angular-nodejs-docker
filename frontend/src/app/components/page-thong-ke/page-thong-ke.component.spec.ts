import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageThongKeComponent } from './page-thong-ke.component';

describe('PageThongKeComponent', () => {
  let component: PageThongKeComponent;
  let fixture: ComponentFixture<PageThongKeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageThongKeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageThongKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
