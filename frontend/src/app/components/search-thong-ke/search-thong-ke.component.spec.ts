import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchThongKeComponent } from './search-thong-ke.component';

describe('SearchThongKeComponent', () => {
  let component: SearchThongKeComponent;
  let fixture: ComponentFixture<SearchThongKeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchThongKeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchThongKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
