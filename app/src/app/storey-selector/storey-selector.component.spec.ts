import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreySelectorComponent } from './storey-selector.component';

describe('StoreySelectorComponent', () => {
  let component: StoreySelectorComponent;
  let fixture: ComponentFixture<StoreySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
