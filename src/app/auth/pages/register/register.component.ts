import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  document = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  phone = new FormControl('', [Validators.required]);


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: this.name,
      lastName: this.lastName,
      document: this.document,
      email: this.email,
      password: this.password,
      phone: this.phone
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  handlerLogin() {
    this.router.navigate(['/auth/login']);
  }

}
