import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatLineModule} from "@angular/material/core";
import {Habit, HabitType, UserWithHabits} from "../shared/models";
import {UsersHabitsService} from "../services/users-habits.service";
import {BehaviorSubject, Subscription} from "rxjs";


@Component({
  selector: 'app-habit',
  template: `
    <mat-card style="max-width: 700px; min-width: 400px; min-height: 575px;">
      <mat-card-header style="margin: 0 auto 20px auto">
        <mat-card-title style="font-size: 30px; margin-top: 20px;">My Habits</mat-card-title>
      </mat-card-header>

      <mat-card-content style="width: 100%">
        <form [formGroup]="habitForm">
          <div style="margin: 0 20px; display: inline-block;">
            <button (click)="addHabit()" mat-mini-fab color="primary" aria-label="Add a habit">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <mat-form-field style="width: 70%;">
            <input matInput formControlName="newHabit" placeholder="Enter new habit">
          </mat-form-field>
        </form>

        <mat-list *ngFor="let habit of userWithHabits?.habits">
          <div *ngIf="!habit.editing" style="display: flex; align-items: center;">
            <mat-checkbox [ngModel]="habit.active" (change)="markHabitAsCompleted(habit, $event)"
                          style="margin-left: 20px">
            </mat-checkbox>
            <mat-label style="margin-left: 20px; width: 60%">{{ habit.challenge }}</mat-label>
            <button mat-icon-button (click)="editHabit(habit)" style="margin-left: 5px" aria-label="Edit habit">
              <mat-icon>edit</mat-icon>
            </button>
          </div>

          <div *ngIf="habit.editing">
            <div style="margin: 0 20px; display: inline-block;">
              <button (click)="saveHabit(habit)" mat-mini-fab color="primary" aria-label="save habit">
                <mat-icon>save</mat-icon>
              </button>
            </div>
            <mat-form-field style="width: 70%">
              <input matInput [(ngModel)]="habit.challenge" placeholder="Save habit" (keyup.enter)="saveHabit(habit)"
              >
            </mat-form-field>
          </div>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    NgForOf,
    MatLineModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    MatListItem,
    MatList,
    MatIconButton,
    MatDividerModule,
    FormsModule,
    MatMiniFabButton,
    NgIf
  ],
  standalone: true
})
export class HabitComponent implements OnInit, OnDestroy {
  @Input() userWithHabits: UserWithHabits | undefined;
  @Output() pointsAddedByHabitCompletion = new EventEmitter<number>();
  habitForm = new FormGroup({
    newHabit: new FormControl('')
  });

  private readonly userWithHabitsSubject: BehaviorSubject<UserWithHabits> | undefined;
  private userWithHabitsSubscription: Subscription | undefined;

  constructor(private usersHabitsService: UsersHabitsService) {
    if (this.userWithHabits) {
      this.userWithHabitsSubject = new BehaviorSubject<UserWithHabits>(this.userWithHabits);

    }
  }

  ngOnInit() {
    if (this.userWithHabitsSubject) {
      if (this.userWithHabits) {
        this.userWithHabitsSubject.next(this.userWithHabits); // Initialize with the input data
      }

      // Subscribe to changes in userWithHabits
      this.userWithHabitsSubscription = this.userWithHabitsSubject.subscribe(userWithHabits => {
        if (userWithHabits) {
          this.userWithHabits = userWithHabits;
        }
      });
    }
  }


  ngOnDestroy() {
    this.userWithHabitsSubscription?.unsubscribe();
  }

  addHabit() {
    const newHabitName = this.habitForm.value.newHabit;
    if (newHabitName) {
      const newHabit: Habit = {solution: newHabitName, active: false, editing: false, type: HabitType.event}
      if (this.userWithHabits) {
        if (this.userWithHabits?.habits?.length > 0) {
          this.userWithHabits?.habits?.unshift(newHabit);
        } else {
          this.userWithHabits = {...this.userWithHabits, habits: [newHabit]}
        }
      }
      this.updateUserWithHabits();
    }
    this.habitForm.reset();
  }

  markHabitAsCompleted(habit: Habit, event: MatCheckboxChange) {
    if (event.checked && this.userWithHabits) {
      const index = this.userWithHabits.habits.indexOf(habit);
      if (index > -1) {
        this.userWithHabits.habits.splice(index, 1);
        this.updateUserWithHabits();
        this.pointsAddedByHabitCompletion.emit(50)
      }
    }
  }

  editHabit(habit: Habit) {
    habit.editing = true;
    this.updateUserWithHabits();
  }

  saveHabit(habit: Habit) {
    habit.editing = false;
    this.updateUserWithHabits();
  }

  updateUserWithHabits() {
    if (this.userWithHabitsSubject && this.userWithHabits) {
      this.userWithHabitsSubject.next(this.userWithHabits); // Emit updated userWithHabits
      this.usersHabitsService.updateUser(this.userWithHabits).subscribe({
        next: (response: any) => {
          console.log("User habits updated successfully", response);
        },
        error: (error: any) => {
          console.error('Error updating user habits:', error);
        }
      });
    }
  }
}
