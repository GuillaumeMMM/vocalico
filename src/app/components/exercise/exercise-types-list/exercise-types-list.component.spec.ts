import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypesListComponent } from './exercise-types-list.component';

describe('ExerciseTypesListComponent', () => {
  let component: ExerciseTypesListComponent;
  let fixture: ComponentFixture<ExerciseTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
