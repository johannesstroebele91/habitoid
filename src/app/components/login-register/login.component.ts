import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Component, inject, OnDestroy} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule,} from '@angular/material/card';
import {Subscription} from "rxjs";
import {AuthResponseData} from "../../shared/models";

@Component({
  selector: 'app-login',
  template: `
    <mat-card
      style="padding: 30px 12px; text-align: center; max-width: 500px; margin: 5% auto 0 auto;"
    >
      <mat-card-header style="display: block;">
        <mat-card-title style=" font-size: 36px">Welcome!</mat-card-title>
        <p style="margin: 30px auto 30px auto; line-height: 1.85"
        >Why settle for ‘just okay’? Go full ‘Kanye Interrupts Taylor’ level of
          habit mastery. Turn your hustle into high scores cause consistency deserves the kind of praise your cat
          would give you… 'none'.
        </p>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()">
          <div [formGroup]="loginForm">
            <mat-form-field style="display: block">
              <mat-label>Enter your email</mat-label>
              <input
                matInput
                formControlName="email"
                placeholder="pat@example.com"
                name="email"
                autocomplete="email"
              />
              <mat-error *ngIf="email.invalid">{{
                  ERROR_MESSAGE
                }}
              </mat-error>
            </mat-form-field>

            <mat-form-field style="display: block">
              <mat-label>Enter your password</mat-label>
              <input
                matInput
                formControlName="password"
                [type]="hidePasswordInput ? 'password' : 'text'"
                name="password"
                autocomplete="current-password"
              />
              <button
                type="button"
                mat-icon-button
                matSuffix
                (click)="hidePasswordInput = !hidePasswordInput"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hidePasswordInput"
              >
                <mat-icon>{{
                    hidePasswordInput ? 'visibility_off' : 'visibility'
                  }}
                </mat-icon>
              </button>
              <mat-error *ngIf="password.invalid">{{
                  ERROR_MESSAGE
                }}
              </mat-error>
            </mat-form-field>
          </div>
          <button
            type="submit"
            mat-raised-button
            color="primary"
            style="margin: 0 auto;"
          >
            Login
          </button>
        </form>
      </mat-card-content>
      <mat-error *ngIf="requestErrorMessage !== ''" style="margin-top: 10px"
      >{{ requestErrorMessage }}
      </mat-error>
      <mat-card-footer
      ><p style="margin: 20px auto 0;">
        Not a member yet? <a routerLink="register">Register now!</a>
      </p>
      </mat-card-footer>
    </mat-card>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelect,
    MatOption,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardModule,
    RouterLink,
  ],
})
export class LoginComponent implements OnDestroy {
  hidePasswordInput = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  router = inject(Router);
  authService = inject(AuthService);
  requestErrorMessage: string = '';
  protected readonly ERROR_MESSAGE = "'You must enter a valid value'";
  private authServiceSub: Subscription | undefined;

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (
      this.loginForm.status === "VALID" &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      this.authService
        .login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe({
          next: (response: AuthResponseData) => {
            if (response.registered) this.router.navigate([`/home/${response.localId}`]);
          },
          error: (error) => {
            console.log('Error on log in', error)
            this.requestErrorMessage = 'The combination of the email and password that you have entered, does not exists';
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.authServiceSub?.unsubscribe()
  }
}
