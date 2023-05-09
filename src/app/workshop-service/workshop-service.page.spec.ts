import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkshopServicePage } from './workshop-service.page';

describe('WorkshopServicePage', () => {
  let component: WorkshopServicePage;
  let fixture: ComponentFixture<WorkshopServicePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkshopServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
