import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaModalComponent } from './tema-modal.component';

describe('TemaModalComponent', () => {
  let component: TemaModalComponent;
  let fixture: ComponentFixture<TemaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
