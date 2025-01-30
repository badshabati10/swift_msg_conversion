import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RefCodeTypeMaintComponent} from "./refcodetype-maint.component";

describe('RefCodeTypeMaintComponent', () => {
  let component: RefCodeTypeMaintComponent;
  let fixture: ComponentFixture<RefCodeTypeMaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefCodeTypeMaintComponent]
    });
    fixture = TestBed.createComponent(RefCodeTypeMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
