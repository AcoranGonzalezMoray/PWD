import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBoxItemComponent } from './reserve-box-item.component';

describe('ReserveBoxItemComponent', () => {
  let component: ReserveBoxItemComponent;
  let fixture: ComponentFixture<ReserveBoxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveBoxItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
