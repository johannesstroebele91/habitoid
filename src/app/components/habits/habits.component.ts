import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule,} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {Habit, HabitType, UserWithHabits} from "../../shared/models";
import {
  ACTIONS_COL,
  PROACTIVE_CHECKBOX_METRIC_COL,
  PROACTIVE_NUMERIC_METRIC_COL,
  PROBLEM_COL,
  PROGRESS_1_DAY_AGO_COL,
  PROGRESS_2_DAYS_AGO_COL,
  PROGRESS_3_DAY_AGO_COL,
  PROGRESS_4_DAY_AGO_COL,
  PROGRESS_5_DAY_AGO_COL,
  PROGRESS_6_DAY_AGO_COL,
  PROGRESS_7_DAY_AGO_COL,
  PROGRESS_FIRST_QUARTER_COL,
  PROGRESS_FOURTH_QUARTER_COL,
  PROGRESS_MONTH_COL,
  PROGRESS_SECOND_QUARTER_COL,
  PROGRESS_THIRD_QUARTER_COL,
  PROGRESS_TODAY_COL,
  PROGRESS_WEEK_COL,
  PROGRESS_YEAR_COL,
  REACTIVE_METRIC_COL,
  SOLUTION_COL,
  TRIGGER_COL
} from "../../shared/columns";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {HabitTableComponent} from "./habit-table.component";
import {ColDef, ColGroupDef} from "ag-grid-community";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-habits',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCard, MatCardContent, MatFabButton, FormsModule, MatIconButton, NgIf, AgGridAngular, MatTabGroup, MatTab, HabitTableComponent, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatTooltip
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <mat-tab-group>
          <!-- Proactive Checkbox Habits -->
          <mat-tab>
            <ng-template mat-tab-label>
              <label>Proactive Checkbox Habits</label>
              <mat-icon matTooltipClass="linebreak" style="font-size: 15px"
                        [matTooltip]="'Example:\\n\\nIdentify the problem e.g. I want to loose weight (Problem).\\n\\nSolve the problem e.g. walk around the corner 3 times each day (Solution).'">
                help
              </mat-icon>
            </ng-template>
            @if (proactiveCheckboxHabitsRowData) {
              <app-habit-table [rowData]="proactiveCheckboxHabitsRowData"
                               [colDefs]="typeBasedColDefs(MetricType.ProactiveCheckbox)"></app-habit-table>
            }
          </mat-tab>
          <!-- Proactive Numeric Habits -->
          <mat-tab>
            <ng-template mat-tab-label>
              <label>Proactive Numeric Habits</label>
              <mat-icon matTooltipClass="linebreak" style="font-size: 15px"
                        [matTooltip]="'Example:\\n\\nIdentify the problem e.g. I get headaches because I don\\´t drink enough water (Problem).\\n\\nSolve the problem e.g. drink 3 liters of water each day (Solution).'">
                help
              </mat-icon>
            </ng-template>
            @if (proactiveNumericHabitsRowData) {
              <app-habit-table [rowData]="proactiveNumericHabitsRowData"
                               [colDefs]="typeBasedColDefs(MetricType.ProactiveNumeric)"></app-habit-table>
            }
          </mat-tab>
          <!-- Reactive Habits -->
          <mat-tab>
            <ng-template mat-tab-label>
              <label>Reactive Habits</label>
              <mat-icon matTooltipClass="linebreak" style="font-size: 15px"
                        [matTooltip]="'Example:\\n\\nWhen a certain trigger occurs e.g. hit a wall on a task (Trigger).\\n\\nI should stop myself from reacting in a negative way e.g. distract myself on YouTube (Problem).\\n\\nBut instead either continue working or regain energy e.g. take a walk (Solution).'">
                help
              </mat-icon>
            </ng-template>
            @if (reactiveHabitsRowData) {
              <app-habit-table [rowData]="reactiveHabitsRowData"
                               [colDefs]="typeBasedColDefs(MetricType.Reactive)"></app-habit-table>
            }
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
})
export class HabitsComponent implements OnInit {
  proactiveCheckboxHabitsRowData: Habit[] = []; // TODO Typ anpassen
  proactiveNumericHabitsRowData: Habit[] = []; // TODO Typ anpassen
  reactiveHabitsRowData: Habit[] = []; // TODO Typ anpassen
  @Input() userWithHabits: UserWithHabits | undefined;
  protected readonly MetricType = HabitType;

  ngOnInit(): void {
    if (this.userWithHabits) {
      this.proactiveCheckboxHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.ProactiveCheckbox);
      this.proactiveNumericHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.ProactiveNumeric);
      this.reactiveHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.Reactive);
    }
  }

  typeBasedColDefs(metricType: HabitType): (ColDef | ColGroupDef)[] {
    const PROGRESS_COLS = [PROGRESS_TODAY_COL, PROGRESS_1_DAY_AGO_COL, PROGRESS_2_DAYS_AGO_COL, PROGRESS_3_DAY_AGO_COL, PROGRESS_4_DAY_AGO_COL, PROGRESS_5_DAY_AGO_COL, PROGRESS_6_DAY_AGO_COL, PROGRESS_7_DAY_AGO_COL, PROGRESS_WEEK_COL, PROGRESS_MONTH_COL, PROGRESS_FIRST_QUARTER_COL, PROGRESS_SECOND_QUARTER_COL, PROGRESS_THIRD_QUARTER_COL, PROGRESS_FOURTH_QUARTER_COL, PROGRESS_YEAR_COL];
    if (metricType === HabitType.ProactiveCheckbox) {
      return [ACTIONS_COL, SOLUTION_COL, PROBLEM_COL, PROACTIVE_CHECKBOX_METRIC_COL, ...PROGRESS_COLS];
    } else if (metricType === HabitType.ProactiveNumeric) {
      return [ACTIONS_COL, SOLUTION_COL, PROBLEM_COL, PROACTIVE_NUMERIC_METRIC_COL, ...PROGRESS_COLS];
    } else {
      return [ACTIONS_COL, TRIGGER_COL, PROBLEM_COL, SOLUTION_COL, REACTIVE_METRIC_COL, ...PROGRESS_COLS];
    }
  }

  // filter habits based on MetricType
  private filterHabitsByType(habits: Habit[], type: HabitType): Habit[] {
    return habits.filter(habit => habit.type === type);
  }

  // build row data based on the MetricType
  private buildRowDataByType(habits: Habit[], type: HabitType): Habit[] {
    if (!habits) {
      return [];
    }

    return this.filterHabitsByType(habits, type).map((habit: Habit) => {
      const rowData: any = {...habit};
      return rowData;
    });
  };
}

