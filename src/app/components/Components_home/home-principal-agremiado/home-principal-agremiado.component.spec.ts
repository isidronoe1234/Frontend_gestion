import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrincipalAgremiadoComponent } from './home-principal-agremiado.component';

describe('HomePrincipalAgremiadoComponent', () => {
  let component: HomePrincipalAgremiadoComponent;
  let fixture: ComponentFixture<HomePrincipalAgremiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePrincipalAgremiadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePrincipalAgremiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
