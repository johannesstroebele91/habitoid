import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle,} from '@angular/material/card';
import {MatCalendar} from '@angular/material/datepicker';
import {MatToolbar} from '@angular/material/toolbar';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PostHabitDialogComponent} from "./habits/post-habit-dialog.component";
import {UserWithHabits} from "../shared/models";
import {UsersHabitsService} from "../services/users-habits.service";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatBadge} from "@angular/material/badge";
import {HabitsComponent} from "./habits/habits.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCalendar,
    MatCardContent,
    MatToolbar,
    NgIf,
    RouterLink,
    NgForOf,
    MatProgressSpinner,
    MatButton,
    MatProgressBar,
    PostHabitDialogComponent,
    MatIcon,
    MatTooltip,
    MatBadge,
    HabitsComponent,
  ],
  template: `
    <div style="margin: 3%">
      <h1>Hi, {{ userWithHabits?.name }}</h1>
      <div
        style="display: flex; justify-content: center; align-items: center; align-content: space-between;">
        <!-- TODO: calculate level based on experience for badge and tooltip: userWithHabits?.experience -->
        <mat-progress-bar mode="determinate" [value]="40" matBadge="7"
                          matBadgeColor="accent"
                          [color]="'accent'" style="width: 100%; margin: 0 20px 10px 20px;"></mat-progress-bar>
      </div>
      <div style="text-align: center; margin-bottom: 20px"><b>270 XP</b> left until level <b>7</b></div>
      @if (userWithHabits) {
        <app-habits [userWithHabits]="userWithHabits"></app-habits>
      }
    </div>
  `,
})
export class HomeComponent implements OnInit {
  userWithHabits: UserWithHabits | undefined;

  constructor(private route: ActivatedRoute, private usersHabitsService: UsersHabitsService) {
  }

  ngOnInit(): void {
    this.usersHabitsService.getUser(this.route.snapshot.params['id']).subscribe({
      next: (userWithHabitsOccurrenceDateAsString: any) => {
        // Convert string date into real date objects
        const habitsWithOccurrenceDateAsObj = userWithHabitsOccurrenceDateAsString.habits.map((habit: any) => {
          return {
            ...habit,
            occurrences: habit.occurrences.map((occurrence: { value: string, date: string }) => {
              return {
                value: occurrence.value,
                date: new Date(occurrence.date),
              }
            })
          }
        });
        this.userWithHabits = {
          ...userWithHabitsOccurrenceDateAsString,
          habits: habitsWithOccurrenceDateAsObj
        }
        console.log("Getting the user was successful");
      },
      error: (error: any) => {
        console.error('Error on getting user:', error);
      }
    })
  }
}
