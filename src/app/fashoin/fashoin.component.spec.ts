import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashoinComponent } from './fashoin.component';

describe('FashoinComponent', () => {
  let component: FashoinComponent;
  let fixture: ComponentFixture<FashoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FashoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
