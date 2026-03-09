import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProduction } from './dialog-production';

describe('DialogProduction', () => {
  let component: DialogProduction;
  let fixture: ComponentFixture<DialogProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProduction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
