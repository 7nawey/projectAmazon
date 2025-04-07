import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFashoinComponent } from './sub-fashoin.component';

describe('SubFashoinComponent', () => {
  let component: SubFashoinComponent;
  let fixture: ComponentFixture<SubFashoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubFashoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubFashoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
