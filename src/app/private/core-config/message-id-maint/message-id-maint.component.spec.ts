import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageIdMaintComponent } from './message-id-maint.component';

describe('MessageIdMaintComponent', () => {
  let component: MessageIdMaintComponent;
  let fixture: ComponentFixture<MessageIdMaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageIdMaintComponent]
    });
    fixture = TestBed.createComponent(MessageIdMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
