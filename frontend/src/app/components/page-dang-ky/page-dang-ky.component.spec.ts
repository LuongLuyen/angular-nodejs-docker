import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDangKyComponent } from './page-dang-ky.component';

describe('PageDangKyComponent', () => {
  let component: PageDangKyComponent;
  let fixture: ComponentFixture<PageDangKyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDangKyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
