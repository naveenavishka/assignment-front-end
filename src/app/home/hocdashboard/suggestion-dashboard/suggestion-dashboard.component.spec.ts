import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDashboardComponent } from './suggestion-dashboard.component';

describe('SuggestionDashboardComponent', () => {
  let component: SuggestionDashboardComponent;
  let fixture: ComponentFixture<SuggestionDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionDashboardComponent]
    });
    fixture = TestBed.createComponent(SuggestionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
