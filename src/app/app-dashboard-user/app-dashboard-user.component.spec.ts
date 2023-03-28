import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashboardUserComponent } from './app-dashboard-user.component';

describe('AppDashboardUserComponent', () => {
  let component: AppDashboardUserComponent;
  let fixture: ComponentFixture<AppDashboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDashboardUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
