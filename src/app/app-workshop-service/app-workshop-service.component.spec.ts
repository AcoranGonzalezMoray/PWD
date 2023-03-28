import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkshopServiceComponent } from './app-workshop-service.component';

describe('AppWorkshopServiceComponent', () => {
  let component: AppWorkshopServiceComponent;
  let fixture: ComponentFixture<AppWorkshopServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppWorkshopServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWorkshopServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
