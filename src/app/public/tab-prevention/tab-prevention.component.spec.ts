import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPreventionComponent } from './tab-prevention.component';

describe('TabPreventionComponent', () => {
  let component: TabPreventionComponent;
  let fixture: ComponentFixture<TabPreventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabPreventionComponent]
    });
    fixture = TestBed.createComponent(TabPreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
