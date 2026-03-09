import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProduction } from './card-production';

describe('CardProduction', () => {
  let component: CardProduction;
  let fixture: ComponentFixture<CardProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProduction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
