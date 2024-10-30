import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoModalComponent } from './curso-modal.component';

describe('CursoModalComponent', () => {
  let component: CursoModalComponent;
  let fixture: ComponentFixture<CursoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
