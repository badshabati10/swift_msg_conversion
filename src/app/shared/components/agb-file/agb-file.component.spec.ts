import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AgbFileComponent} from "./agb-file.component";

describe('AgbFileComponent', () => {
  let component: AgbFileComponent;
  let fixture: ComponentFixture<AgbFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgbFileComponent]
    });
    fixture = TestBed.createComponent(AgbFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
