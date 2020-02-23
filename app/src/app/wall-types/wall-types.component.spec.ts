import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallTypesComponent } from './wall-types.component';

describe('WallTypesComponent', () => {
  let component: WallTypesComponent;
  let fixture: ComponentFixture<WallTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
