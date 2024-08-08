import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCalendar} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {DatePipe, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {AuthService} from "./services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {AuthUser} from "./shared/models";
import {MatTooltip} from "@angular/material/tooltip";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatNativeDateModule, RouterOutlet, MatButton, MatCalendar, MatIcon, MatMenuTrigger, MatIconButton, MatMenu, MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatToolbar, RouterLink, NgIf, MatOption, MatCardActions, MatFabButton, MatMiniFabButton, MatProgressBar, DatePipe, MatTooltip, MatBadge],
  template: `
    <mat-toolbar color="primary" style="width: 100%">
      <mat-toolbar-row style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="letter-spacing: 1px">{{ title }}</span>
          <mat-icon style="margin-left: 5px; position: relative; top: 5px;">event_available</mat-icon>
        </div>
        <span style="flex: 1 1 auto;"></span>
        <div *ngIf="isNotOnLoginOrRegisterPage() && isAuthenticated"
             style="display: flex; justify-content: space-between; align-items: center">
          <button mat-fab extended aria-label="Logout" *ngIf="isNotOnLoginOrRegisterPage() && isAuthenticated"
                  routerLink="/"
                  (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
    <div style="margin: 10px 0">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  title = 'Habitoid';
  private userSub: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLoginAfterReload();

    this.userSub = this.authService.user.subscribe({
      next: (user: AuthUser | null) => {
        console.log('Created user successfully: ', user)
        return this.isAuthenticated = !!user;
      },
      error: (error: any) => console.error('Error on getting user: ', error)
    })
  }

  isNotOnLoginOrRegisterPage(): boolean {
    const isOnLoginPage = this.router.url !== '/';
    const isOnRegisterPage = this.router.url !== '/register';
    return (isOnLoginPage && isOnRegisterPage);
  }

  logout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }
}
