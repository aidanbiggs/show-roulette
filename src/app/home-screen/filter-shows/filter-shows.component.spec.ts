import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShowsComponent } from './filter-shows.component';

describe('FilterShowsComponent', () => {
  let component: FilterShowsComponent;
  let fixture: ComponentFixture<FilterShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
