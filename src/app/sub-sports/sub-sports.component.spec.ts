import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSportsComponent } from './sub-sports.component';

describe('SubSportsComponent', () => {
  let component: SubSportsComponent;
  let fixture: ComponentFixture<SubSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
