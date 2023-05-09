import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatWeDoPage } from './what-we-do.page';

describe('WhatWeDoPage', () => {
  let component: WhatWeDoPage;
  let fixture: ComponentFixture<WhatWeDoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhatWeDoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
