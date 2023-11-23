import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewAgremiadoComponent } from './modal-new-agremiado.component';

describe('ModalNewAgremiadoComponent', () => {
  let component: ModalNewAgremiadoComponent;
  let fixture: ComponentFixture<ModalNewAgremiadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalNewAgremiadoComponent]
    });
    fixture = TestBed.createComponent(ModalNewAgremiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
