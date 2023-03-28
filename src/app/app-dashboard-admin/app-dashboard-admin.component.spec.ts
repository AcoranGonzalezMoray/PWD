import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashboardAdminComponent } from './app-dashboard-admin.component';

describe('AppDashboardAdminComponent', () => {
  let component: AppDashboardAdminComponent;
  let fixture: ComponentFixture<AppDashboardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDashboardAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
