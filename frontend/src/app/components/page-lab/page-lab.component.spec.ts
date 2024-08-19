import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLabComponent } from './page-lab.component';

describe('PageLabComponent', () => {
  let component: PageLabComponent;
  let fixture: ComponentFixture<PageLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
