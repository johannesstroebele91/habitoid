import {Component, computed, inject, Input, model, signal} from "@angular/core";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCalendar} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {DatePipe, NgIf, NgStyle} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup, MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow} from "@angular/material/chips";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {UserWithHabits} from "../shared/models";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-ideal',
  standalone: true,
  imports: [MatTooltipModule, MatButtonToggleModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatNativeDateModule, RouterOutlet, MatButton, MatCalendar, MatIcon, MatMenuTrigger, MatIconButton, MatMenu, MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatToolbar, RouterLink, NgIf, MatFormField, MatSelect, MatOption, MatInput, MatButtonToggleGroup, MatButtonToggle, MatCheckbox, MatCardActions, MatChipGrid, MatChipRow, FormsModule, MatChipInput, MatAutocompleteTrigger, MatAutocomplete, MatFabButton, MatMiniFabButton, ReactiveFormsModule, NgStyle, MatTooltip, DatePipe],
  template: `
    @for (habit of userWithHabits.habits; track habit; let index = $index) {
      <mat-card style="width: 400px">
        <mat-card-content>

          <div
            style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
            <mat-form-field style="width: 80px"
            >
              <mat-label>Order</mat-label>
              <input type="number" matInput [value]="index">
            </mat-form-field>
            <mat-checkbox>Active</mat-checkbox>
            <button mat-mini-fab>
              <mat-icon>delete</mat-icon>
            </button>
          </div>

          <p>Somehow show progress: color? Not number! Per Day of Week; Graph</p>

          <mat-form-field style="width: 100%">
            <mat-label>Name</mat-label>
            <input matInput [value]="habit.name">
          </mat-form-field>

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
        <mat-card-actions style="display: flex; justify-content: space-around;
">
          <button mat-button style="width: 100%">-</button>
          <button mat-button style="width: 100%">+</button>
        </mat-card-actions>

      </mat-card>
    }
  `,
})
export class IdealComponent {
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
  @Input() userWithHabits!: UserWithHabits;

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
