import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageThemCapNhatComponent } from './page-them-cap-nhat.component';

describe('PageThemCapNhatComponent', () => {
  let component: PageThemCapNhatComponent;
  let fixture: ComponentFixture<PageThemCapNhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageThemCapNhatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageThemCapNhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
