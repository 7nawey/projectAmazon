import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBeautyComponent } from './sub-beauty.component';

describe('SubBeautyComponent', () => {
  let component: SubBeautyComponent;
  let fixture: ComponentFixture<SubBeautyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubBeautyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubBeautyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
