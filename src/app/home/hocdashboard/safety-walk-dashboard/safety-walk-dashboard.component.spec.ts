import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyWalkDashboardComponent } from './safety-walk-dashboard.component';

describe('SafetyWalkDashboardComponent', () => {
  let component: SafetyWalkDashboardComponent;
  let fixture: ComponentFixture<SafetyWalkDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SafetyWalkDashboardComponent]
    });
    fixture = TestBed.createComponent(SafetyWalkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
