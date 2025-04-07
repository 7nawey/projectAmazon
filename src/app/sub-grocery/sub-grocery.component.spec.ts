import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroceryComponent } from './sub-grocery.component';

describe('SubGroceryComponent', () => {
  let component: SubGroceryComponent;
  let fixture: ComponentFixture<SubGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubGroceryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
