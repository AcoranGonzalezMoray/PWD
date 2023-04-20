import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiReservaProductoComponent } from './mi-reserva-producto.component';

describe('MiReservaProductoComponent', () => {
  let component: MiReservaProductoComponent;
  let fixture: ComponentFixture<MiReservaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiReservaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiReservaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
