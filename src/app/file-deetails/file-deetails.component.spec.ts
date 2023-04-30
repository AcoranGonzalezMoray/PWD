import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDeetailsComponent } from './file-deetails.component';

describe('FileDeetailsComponent', () => {
  let component: FileDeetailsComponent;
  let fixture: ComponentFixture<FileDeetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDeetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDeetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
