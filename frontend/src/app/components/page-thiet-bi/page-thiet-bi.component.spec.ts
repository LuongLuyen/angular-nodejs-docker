import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageThietBiComponent } from './page-thiet-bi.component';

describe('PageThietBiComponent', () => {
  let component: PageThietBiComponent;
  let fixture: ComponentFixture<PageThietBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageThietBiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageThietBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
