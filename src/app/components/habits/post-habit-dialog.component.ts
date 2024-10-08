import {ChangeDetectionStrategy, Component, computed, inject, model, signal} from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Habit, HabitLabel, HabitType} from "../../shared/models";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgIf, NgStyle} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, GridApi} from "ag-grid-community";
import {DATE_COL, DELETE_COL, VALUE_COL} from "../../shared/columns";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

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
    DatePipe,
    MatTooltip,
    NgStyle,
    MatOption,
    MatSelect,
    MatAutocomplete,
    MatChipInput,
    MatAutocompleteTrigger,
    FormsModule,
    MatChipRemove,
    MatIcon,
    MatChipRow,
    MatChipGrid,
    ReactiveFormsModule,
    AgGridAngular,
    NgIf,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
  ],
  template: `
    <mat-dialog-content>
      <form (ngSubmit)="onSubmit()" [formGroup]="postHabitForm">
        <h2>General</h2>

        <mat-form-field style="width: 100%">
          <mat-label>Type</mat-label>
          <mat-select formControlName="type">
            <mat-option [value]="HabitType.ProactiveCheckbox">{{ HabitType.ProactiveCheckbox }}</mat-option>
            <mat-option [value]="HabitType.Reactive">{{ HabitType.Reactive }}</mat-option>
          </mat-select>
        </mat-form-field>

        @if (type.value) {
          @if ((type?.value === HabitType.ProactiveCheckbox)) {
            <!-- Proactive Habit -->
            <mat-form-field style="width: 100%">
              <mat-label>{{ HabitLabel.Solution }}</mat-label>
              <input matInput [formControlName]="HabitLabel.Solution.toLowerCase()">
            </mat-form-field>
            <mat-form-field style="width: 100%">
              <mat-label>{{ HabitLabel.Problem }}</mat-label>
              <input matInput [formControlName]="HabitLabel.Problem.toLowerCase()">
            </mat-form-field>
          } @else {
            <!-- Reactive Habit -->
            <mat-form-field style="width: 100%">
              <mat-label>{{ HabitLabel.Trigger }}</mat-label>
              <input matInput [formControlName]="HabitLabel.Trigger.toLowerCase()">
            </mat-form-field>
            <mat-form-field style="width: 100%">
              <mat-label>{{ HabitLabel.Problem }}</mat-label>
              <input matInput [formControlName]="HabitLabel.Problem.toLowerCase()">
            </mat-form-field>
            <mat-form-field style="width: 100%">
              <mat-label>{{ HabitLabel.Solution }}</mat-label>
              <input matInput [formControlName]="HabitLabel.Solution.toLowerCase()">
            </mat-form-field>
          }
        }
        <!-- TODO fix
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
       -->
      </form>

      <form (ngSubmit)="onSubmitOccurrence()" [formGroup]="addOccurrenceForm">
        <div>
          <h2>Occurrences</h2>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
            <button
              type="submit"
              mat-raised-button
              color="primary"
              style="height: 56px;"
            >
              Add occurrence
            </button>
            <mat-form-field subscriptSizing="dynamic">
              <mat-label>Select a date</mat-label>
              <input id="date" matInput [matDatepicker]="picker" formControlName="date">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            <mat-form-field subscriptSizing="dynamic">
              <mat-label>Time</mat-label>
              <input id="time" matInput formControlName="time">
            </mat-form-field>
          </div>

          <i style="display: inline-block; margin:  15px 0">The date and value of a occurrence can be edited by
            clicking
            into a respective cell</i>
          <ag-grid-angular
            class="ag-theme-balham"
            [gridOptions]="gridOptions"
            [rowData]="rowData"
            style="height: 300px;"
          ></ag-grid-angular>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true">Submit</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostHabitDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  habit: Habit | undefined = this.data;
  // TODO delete later unused fields if not needed!
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
  gridApi!: GridApi;
  colDefs: ColDef[] | null | undefined = [DELETE_COL, DATE_COL, VALUE_COL]
  gridOptions = {
    rowData: this.habit?.occurrences || [],
    columnDefs: this.colDefs,
  };
  rowData: any;
  protected readonly HabitLabel = HabitLabel;
  protected readonly HabitType = HabitType;
  protected postHabitForm = new FormGroup({
    type: new FormControl(this.habit?.type ?? HabitType.ProactiveCheckbox, Validators.required),
    trigger: new FormControl(this.habit?.trigger ?? ""),
    problem: new FormControl(this.habit?.problem ?? "", Validators.required),
    solution: new FormControl(this.habit?.solution ?? "", Validators.required),
  });
  protected addOccurrenceForm = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    time: new FormControl("", Validators.required),
  });

  get type(): any {
    return this.postHabitForm.get('type');
  }

  onSubmit() {
    if (
      this.postHabitForm.status === "VALID" &&
      this.postHabitForm.value.problem && this.postHabitForm.value.solution
    ) {
    }
  }

  addHabit() {
    this.rowData.push(this.habit?.occurrences);
    this.gridApi.setGridOption("rowData", this.rowData)

    /* TODO rework logic
          const newHabit: any = {
            type: HabitType.Proactive,
            goal: newHabitName,
          }
          if (this.userWithHabits) {
            if (this.userWithHabits?.habits?.length > 0) {
              this.userWithHabits?.habits?.unshift(newHabit);
            } else {
              this.userWithHabits = {...this.userWithHabits, habits: [newHabit]}
            }
          } */
    this.postHabitForm.reset();
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

  onSubmitOccurrence() {
    console.log("Occurrence")
  }
}
