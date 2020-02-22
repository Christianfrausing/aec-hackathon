import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreyHeightsComponent } from './storey-heights.component';

describe('StoreyHeightsComponent', () => {
  let component: StoreyHeightsComponent;
  let fixture: ComponentFixture<StoreyHeightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreyHeightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreyHeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
