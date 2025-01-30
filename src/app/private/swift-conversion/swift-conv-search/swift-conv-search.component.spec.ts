import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftConvSearchComponent } from './swift-conv-search.component';

describe('SwiftConvSearchComponent', () => {
  let component: SwiftConvSearchComponent;
  let fixture: ComponentFixture<SwiftConvSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwiftConvSearchComponent]
    });
    fixture = TestBed.createComponent(SwiftConvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
