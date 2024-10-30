import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteComponent } from './docente.component';

describe('DocenteComponent', () => {
  let component: DocenteComponent;
  let fixture: ComponentFixture<DocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
