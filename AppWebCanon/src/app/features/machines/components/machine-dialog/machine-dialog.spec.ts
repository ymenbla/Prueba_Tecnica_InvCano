import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDialog } from './machine-dialog';

describe('MachineDialog', () => {
  let component: MachineDialog;
  let fixture: ComponentFixture<MachineDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
