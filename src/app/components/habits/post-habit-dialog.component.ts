import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  model,
  OnDestroy,
  OnInit,
  Output,
  signal
} from "@angular/core";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {FormControl, FormGroup} from "@angular/forms";
import {Habit, MetricType, UserWithHabits} from "../../shared/models";
import {UsersHabitsService} from "../../services/users-habits.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-post-habit-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatFormFieldModule,
  ],
  template: `
    <mat-dialog-content>
      <mat-form-field style="width: 100%">
        <mat-label>Name</mat-label>
        <input matInput [value]="habit?.solution">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Name</mat-label>
        <input matInput [value]="habit?.solution">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Name</mat-label>
        <input matInput [value]="habit?.solution">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Name</mat-label>
        <input matInput [value]="habit?.solution">
      </mat-form-field>

    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button mat-dialog-close>Delete</button>
      <button mat-button [mat-dialog-close]="true">Add</button>
    </mat-dialog-actions>


    <!--<mat-card style="width: 400px">

      <mat-form-field style="width: 100%">
        <mat-label>Description</mat-label>
        <textarea matInput></textarea>
      </mat-form-field>

      <mat-form-field style="width: 100%">
        <mat-label>Category</mat-label>
        <mat-chip-grid #chipGrid aria-label="Category selection">
          @for (category of categories(); track $index) {
            <mat-chip-row (removed)="remove(category)">
              {{ category }}
              <button matChipRemove [attr.aria-label]="'remove ' + category">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          }
        </mat-chip-grid>
        <input
          name="currentCategory"
          placeholder="New Category..."
          #categoryInput
          [(ngModel)]="currentCategory"
          [matChipInputFor]="chipGrid"
          [matAutocomplete]="auto"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
        />
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
          @for (category of filteredCategory(); track category) {
            <mat-option [value]="category">{{ category }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>

      <mat-form-field style="width: 100%">
        <mat-label>Difficulty</mat-label>
        <mat-select>
          <mat-option value="one">Easy</mat-option>
          <mat-option value="two">Moderate</mat-option>
          <mat-option value="two">Difficult</mat-option>
        </mat-select>
      </mat-form-field>
      <p>{{ habit.occurrences?.length }} tracked occurrences until today:</p>
      @for (occurrence of habit.occurrences; track occurrence) {
        <span
          [ngStyle]="{'background': occurrence.value === 1 ? '#71da86' : '#ff4d4d'}"
          matTooltip="Occurrence on {{ occurrence.date | date:'dd MMM yyyy, HH:mm' }} with value {{ occurrence.value }}"
          style="display: inline-block; width: 9px; height: 10px; border-radius: 2px; margin: 2px">
          </span>
      }

    </mat-card-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true">Add</button>
    </mat-dialog-actions>
  </mat-card>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostHabitDialogComponent implements OnInit, OnDestroy {
  readonly dialogRef = inject(MatDialogRef<PostHabitDialogComponent>);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentCategory = model('');
  readonly categories = signal(['Lemon']);
  readonly allCategories: string[] = ['Work', 'Health'];
  days = new FormControl('');
  dayList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly filteredCategory = computed(() => {
    const currentCategory = this.currentCategory().toLowerCase();
    return currentCategory
      ? this.allCategories.filter(category => category.toLowerCase().includes(currentCategory))
      : this.allCategories.slice();
  });
  readonly announcer = inject(LiveAnnouncer);

  @Input() userWithHabits: UserWithHabits | undefined;
  @Output() pointsAddedByHabitCompletion = new EventEmitter<number>();
  habitForm = new FormGroup({
    newHabit: new FormControl('')
  });
  habit: any;
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
      const newHabit: Habit = {
        measurement: {
          type: MetricType.Repetition
        },
        progressForMonth: "",
        progressForWeek: "",
        progressLast7Days: "",
        progressToday: "",
        goal: newHabitName, active: false, editing: false
      }
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if (value) {
      this.categories.update(categories => [...categories, value]);
    }

    // Clear the input value
    this.currentCategory.set('');
  }

  remove(category: string): void {
    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index < 0) {
        return categories;
      }

      categories.splice(index, 1);
      void this.announcer.announce(`Removed ${category}`);
      return [...categories];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.update(categories => [...categories, event.option.viewValue]);
    this.currentCategory.set('');
    event.option.deselect();
  }
}
