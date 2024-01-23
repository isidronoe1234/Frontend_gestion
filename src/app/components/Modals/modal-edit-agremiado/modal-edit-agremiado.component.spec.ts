import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAgremiadoComponent } from './modal-edit-agremiado.component';

describe('ModalEditAgremiadoComponent', () => {
  let component: ModalEditAgremiadoComponent;
  let fixture: ComponentFixture<ModalEditAgremiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditAgremiadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditAgremiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
