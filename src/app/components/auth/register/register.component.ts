import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { isLoading, stopLoading } from '../../shared/store/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  loading = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
      console.log(ui.isLoading);
    });
  }
  async crearUsuario(): Promise<void> {
    if (this.registroForm.invalid) return;
    this.store.dispatch(isLoading());

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { nombre, correo, password } = this.registroForm.value;
    try {
      await this.authService.createUser(nombre, correo, password);
      this.store.dispatch(stopLoading());

      Swal.close();
      this.router.navigate(['/']);
    } catch (error) {
      this.store.dispatch(stopLoading());

      const newError = error as Error;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: newError.message,
      });
    }
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
