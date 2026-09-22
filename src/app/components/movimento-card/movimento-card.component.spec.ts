import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoCardComponent } from './movimento-card.component';

describe('MovimentoCardComponent', () => {
  let component: MovimentoCardComponent;
  let fixture: ComponentFixture<MovimentoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentoCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
