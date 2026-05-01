import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealplan } from './add-mealplan';

describe('AddMealplan', () => {
  let component: AddMealplan;
  let fixture: ComponentFixture<AddMealplan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMealplan],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMealplan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
