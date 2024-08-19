import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMuonComponent } from './page-muon.component';

describe('PageMuonComponent', () => {
  let component: PageMuonComponent;
  let fixture: ComponentFixture<PageMuonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMuonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageMuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
