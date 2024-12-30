import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthItComponent } from './health-it.component';

describe('HealthItComponent', () => {
  let component: HealthItComponent;
  let fixture: ComponentFixture<HealthItComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthItComponent]
    });
    fixture = TestBed.createComponent(HealthItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
