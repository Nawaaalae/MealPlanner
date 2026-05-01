import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplansList } from './mealplans-list';

describe('MealplansList', () => {
  let component: MealplansList;
  let fixture: ComponentFixture<MealplansList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealplansList],
    }).compileComponents();

    fixture = TestBed.createComponent(MealplansList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
