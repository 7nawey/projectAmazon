import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubElectronicComponent } from './sub-electronic.component';

describe('SubElectronicComponent', () => {
  let component: SubElectronicComponent;
  let fixture: ComponentFixture<SubElectronicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubElectronicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubElectronicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
