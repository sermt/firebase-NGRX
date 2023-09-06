import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../../shared/store/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }
  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.store.dispatch(stopLoading());
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

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
