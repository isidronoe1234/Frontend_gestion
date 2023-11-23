import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgremiadosComponent } from './agremiados.component';

describe('AgremiadosComponent', () => {
  let component: AgremiadosComponent;
  let fixture: ComponentFixture<AgremiadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgremiadosComponent]
    });
    fixture = TestBed.createComponent(AgremiadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
