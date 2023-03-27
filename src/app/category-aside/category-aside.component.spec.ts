import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAsideComponent } from './category-aside.component';

describe('CategoryAsideComponent', () => {
  let component: CategoryAsideComponent;
  let fixture: ComponentFixture<CategoryAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
