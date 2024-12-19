import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationstructureComponent } from './organizationstructure.component';

describe('OrganizationstructureComponent', () => {
  let component: OrganizationstructureComponent;
  let fixture: ComponentFixture<OrganizationstructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationstructureComponent]
    });
    fixture = TestBed.createComponent(OrganizationstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
