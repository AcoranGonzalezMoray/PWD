import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWhatWeDoComponent } from './app-what-we-do.component';

describe('AppWhatWeDoComponent', () => {
  let component: AppWhatWeDoComponent;
  let fixture: ComponentFixture<AppWhatWeDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppWhatWeDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWhatWeDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
