import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideCheckBoxComponent } from './aside-check-box.component';

describe('AsideCheckBoxComponent', () => {
  let component: AsideCheckBoxComponent;
  let fixture: ComponentFixture<AsideCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideCheckBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
