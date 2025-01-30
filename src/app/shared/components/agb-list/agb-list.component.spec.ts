import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgbListComponent } from './agb-list.component';

describe('AgbListComponent', () => {
  let component: AgbListComponent;
  let fixture: ComponentFixture<AgbListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgbListComponent]
    });
    fixture = TestBed.createComponent(AgbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
