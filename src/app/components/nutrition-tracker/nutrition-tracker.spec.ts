import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionTracker } from './nutrition-tracker';

describe('NutritionTracker', () => {
  let component: NutritionTracker;
  let fixture: ComponentFixture<NutritionTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionTracker],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
