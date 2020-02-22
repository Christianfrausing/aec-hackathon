import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallSelectorComponent } from './wall-selector.component';

describe('WallSelectorComponent', () => {
  let component: WallSelectorComponent;
  let fixture: ComponentFixture<WallSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
