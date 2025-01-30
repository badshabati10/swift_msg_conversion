import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRequestModalComponent } from './session-request-modal.component';

describe('SessionRequestModalComponent', () => {
  let component: SessionRequestModalComponent;
  let fixture: ComponentFixture<SessionRequestModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionRequestModalComponent]
    });
    fixture = TestBed.createComponent(SessionRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
