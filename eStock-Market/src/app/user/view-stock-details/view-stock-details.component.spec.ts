import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockDetailsComponent } from './view-stock-details.component';

describe('ViewStockDetailsComponent', () => {
  let component: ViewStockDetailsComponent;
  let fixture: ComponentFixture<ViewStockDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStockDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
