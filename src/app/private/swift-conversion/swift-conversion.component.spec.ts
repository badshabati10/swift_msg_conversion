import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftConversionComponent } from './swift-conversion.component';

describe('SwiftConversionComponent', () => {
  let component: SwiftConversionComponent;
  let fixture: ComponentFixture<SwiftConversionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwiftConversionComponent]
    });
    fixture = TestBed.createComponent(SwiftConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
