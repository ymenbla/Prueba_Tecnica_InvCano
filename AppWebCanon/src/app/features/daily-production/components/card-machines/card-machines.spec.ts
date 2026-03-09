import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMachines } from './card-machines';

describe('CardMachines', () => {
  let component: CardMachines;
  let fixture: ComponentFixture<CardMachines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMachines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMachines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
