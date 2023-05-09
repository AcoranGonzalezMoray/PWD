import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkshopStorePage } from './workshop-store.page';

describe('WorkshopStorePage', () => {
  let component: WorkshopStorePage;
  let fixture: ComponentFixture<WorkshopStorePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkshopStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
