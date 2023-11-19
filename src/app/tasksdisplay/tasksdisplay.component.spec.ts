import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksdisplayComponent } from './tasksdisplay.component';

describe('TasksdisplayComponent', () => {
  let component: TasksdisplayComponent;
  let fixture: ComponentFixture<TasksdisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksdisplayComponent]
    });
    fixture = TestBed.createComponent(TasksdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
