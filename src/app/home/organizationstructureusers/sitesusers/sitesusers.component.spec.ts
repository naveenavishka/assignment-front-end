import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesusersComponent } from './sitesusers.component';

describe('SitesusersComponent', () => {
  let component: SitesusersComponent;
  let fixture: ComponentFixture<SitesusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitesusersComponent]
    });
    fixture = TestBed.createComponent(SitesusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
