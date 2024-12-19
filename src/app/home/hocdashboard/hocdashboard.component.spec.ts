import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HocdashboardComponent } from './hocdashboard.component';

describe('HocdashboardComponent', () => {
  let component: HocdashboardComponent;
  let fixture: ComponentFixture<HocdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HocdashboardComponent]
    });
    fixture = TestBed.createComponent(HocdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
