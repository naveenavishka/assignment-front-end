import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationstructureuserComponent } from './organizationstructureusers.component';

describe('OrganizationstructureComponent', () => {
  let component: OrganizationstructureuserComponent;
  let fixture: ComponentFixture<OrganizationstructureuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationstructureuserComponent]
    });
    fixture = TestBed.createComponent(OrganizationstructureuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
