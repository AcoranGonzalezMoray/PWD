import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkshopStoreComponent } from './app-workshop-store.component';

describe('AppWorkshopStoreComponent', () => {
  let component: AppWorkshopStoreComponent;
  let fixture: ComponentFixture<AppWorkshopStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppWorkshopStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWorkshopStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
