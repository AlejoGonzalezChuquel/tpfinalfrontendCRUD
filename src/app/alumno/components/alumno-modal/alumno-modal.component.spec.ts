import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoModalComponent } from './alumno-modal.component';

describe('AlumnoModalComponent', () => {
  let component: AlumnoModalComponent;
  let fixture: ComponentFixture<AlumnoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
