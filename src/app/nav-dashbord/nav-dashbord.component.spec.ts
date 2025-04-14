import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDashbordComponent } from './nav-dashbord.component';

describe('NavDashbordComponent', () => {
  let component: NavDashbordComponent;
  let fixture: ComponentFixture<NavDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
