import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceLoaderComponent } from './space-loader.component';

describe('SpaceLoaderComponent', () => {
  let component: SpaceLoaderComponent;
  let fixture: ComponentFixture<SpaceLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
