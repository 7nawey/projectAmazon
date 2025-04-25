import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingallComponent } from './shippingall.component';

describe('ShippingallComponent', () => {
  let component: ShippingallComponent;
  let fixture: ComponentFixture<ShippingallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
