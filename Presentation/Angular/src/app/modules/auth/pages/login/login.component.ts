import { Component } from '@angular/core';
import { ProblemDetails, UserDataInputDto, UserDto } from 'src/app/api/models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/api';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  HidePassword: boolean = true;
  ShowLoading: boolean = false;

  isLoading: Observable<boolean>;
  errorMessage: '';

  public constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isLoading = this.authService.isLoading;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();

    const request: UserDataInputDto = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(request.username, request.password).subscribe({
      next: ({ data, message }) => {
        this.router.navigateByUrl('/home');
      },
      error: ({ error }) => {
        const { detail, title, status } = error as ProblemDetails;
        if (status === 402) {
          Swal.fire(title, detail, 'error');
          return;
        }

        this.errorMessage = error.detail;
      },
    });
  }
}
