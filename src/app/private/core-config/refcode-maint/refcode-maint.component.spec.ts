import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCodeMaintComponent } from './refcode-maint.component';

describe('RefcodeMaintComponent', () => {
  let component: RefCodeMaintComponent;
  let fixture: ComponentFixture<RefCodeMaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefCodeMaintComponent]
    });
    fixture = TestBed.createComponent(RefCodeMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
