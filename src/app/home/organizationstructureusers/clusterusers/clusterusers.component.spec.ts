import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterusersComponent } from './clusterusers.component';

describe('ClusterusersComponent', () => {
  let component: ClusterusersComponent;
  let fixture: ComponentFixture<ClusterusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClusterusersComponent]
    });
    fixture = TestBed.createComponent(ClusterusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
