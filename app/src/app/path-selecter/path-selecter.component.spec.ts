import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathSelecterComponent } from './path-selecter.component';

describe('PathSelecterComponent', () => {
  let component: PathSelecterComponent;
  let fixture: ComponentFixture<PathSelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathSelecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
