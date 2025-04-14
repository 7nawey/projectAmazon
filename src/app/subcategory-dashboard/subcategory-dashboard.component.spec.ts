import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDashboardComponent } from './subcategory-dashboard.component';

describe('SubcategoryDashboardComponent', () => {
  let component: SubcategoryDashboardComponent;
  let fixture: ComponentFixture<SubcategoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
