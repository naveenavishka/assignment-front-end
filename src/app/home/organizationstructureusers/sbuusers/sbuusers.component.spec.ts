import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbuusersComponent } from './sbuusers.component';

describe('SbuusersComponent', () => {
  let component: SbuusersComponent;
  let fixture: ComponentFixture<SbuusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbuusersComponent]
    });
    fixture = TestBed.createComponent(SbuusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
