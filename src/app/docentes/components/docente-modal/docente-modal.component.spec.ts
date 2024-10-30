import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteModalComponent } from './docente-modal.component';

describe('DocenteModalComponent', () => {
  let component: DocenteModalComponent;
  let fixture: ComponentFixture<DocenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
