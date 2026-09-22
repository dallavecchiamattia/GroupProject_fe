import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoDetailComponent } from './movimento-detail.component';

describe('MovimentoDetailComponent', () => {
  let component: MovimentoDetailComponent;
  let fixture: ComponentFixture<MovimentoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});