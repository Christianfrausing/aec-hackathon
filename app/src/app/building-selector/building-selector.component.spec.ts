import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingSelectorComponent } from './building-selector.component';

describe('BuildingSelectorComponent', () => {
  let component: BuildingSelectorComponent;
  let fixture: ComponentFixture<BuildingSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
