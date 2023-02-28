import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  errorMessages = new Map<string, string>([
    ['401', 'Email o contraseña incorrectos'],
    ['0', 'No se pudo establecer conexión con el servidor']
  ]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (e) => {
          const message = this.errorMessages.get(e.status.toString()) ?? "Ocurrió un error inesperado";
          Swal.fire('Error', message, 'error');
        }
      });
  }

  handlerRegister() {
    this.router.navigate(['/auth/register']);
  }

}
