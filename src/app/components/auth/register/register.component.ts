import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registroForm: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async crearUsuario(): Promise<void> {
    if (this.registroForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { nombre,correo, password } = this.registroForm.value;
    try {
      await this.authService.createUser(nombre, correo, password);

      Swal.close();
      this.router.navigate(['/']);
    } catch (error) {
      const newError = error as Error;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: newError.message,
      });
    }
  }
}
