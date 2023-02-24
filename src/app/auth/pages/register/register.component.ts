import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  dni = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  phone = new FormControl('', [Validators.required]);


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: this.name,
      lastName: this.lastName,
      dni: this.dni,
      email: this.email,
      password: this.password,
      phone: this.phone
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
        .subscribe({
          next: () => this.router.navigate(['/auth/login']),
          error: (e) => {
            console.log(e);
            Swal.fire('Error', e.error.detail, 'error')
          }
        });
    }
  }

  handlerLogin() {
    this.router.navigate(['/auth/login']);
  }

}
