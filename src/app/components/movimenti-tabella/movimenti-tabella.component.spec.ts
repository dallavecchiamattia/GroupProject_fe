import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentiTabellaComponent } from './movimenti-tabella.component';

describe('MovimentiTabellaComponent', () => {
  let component: MovimentiTabellaComponent;
  let fixture: ComponentFixture<MovimentiTabellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentiTabellaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentiTabellaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
