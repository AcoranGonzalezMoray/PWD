import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiReservaServicioComponent } from './mi-reserva-servicio.component';

describe('MiReservaServicioComponent', () => {
  let component: MiReservaServicioComponent;
  let fixture: ComponentFixture<MiReservaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiReservaServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiReservaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
