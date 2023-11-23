import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgremiadosArchivadosComponent } from './agremiados-archivados.component';

describe('AgremiadosArchivadosComponent', () => {
  let component: AgremiadosArchivadosComponent;
  let fixture: ComponentFixture<AgremiadosArchivadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgremiadosArchivadosComponent]
    });
    fixture = TestBed.createComponent(AgremiadosArchivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
