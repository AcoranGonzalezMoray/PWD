import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BPSantaBrigida';
  loading = false;

  constructor(private ngZone: NgZone,private router: Router) { }

  ngOnInit() {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      } else {
        this.loading = true; // Mostrar el loader
        setTimeout(() => {
          // Cargar datos aquí
          this.ngZone.run(() => {
            this.loading = false; // Ocultar el loader
          });
        }, 1000); // Retrasar la carga de los datos por 2 segundos (por ejemplo)
        
      }
    });
    
  }
  
}
