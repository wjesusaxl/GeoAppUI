import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectionMainComponent } from './project-selection-main.component';

describe('ProjectSelectionMainComponent', () => {
  let component: ProjectSelectionMainComponent;
  let fixture: ComponentFixture<ProjectSelectionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSelectionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSelectionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
