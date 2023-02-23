import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al usuario a la página de inicio
      this.router.navigateByUrl('/dashboard');
    } else {
      // Redirigir al usuario al formulario de inicio de sesión
      this.router.navigateByUrl('/auth');
    }
  }
}
