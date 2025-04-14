import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydashboardComponent } from './categorydashboard.component';

describe('CategorydashboardComponent', () => {
  let component: CategorydashboardComponent;
  let fixture: ComponentFixture<CategorydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorydashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
