import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule,} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {Habit, HabitType, Occurrence, UserWithHabits} from "../../shared/models";
import {
  ACTIONS_COL,
  METRIC_COL,
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
          <mat-tab>
            <ng-template mat-tab-label>
              <label>{{ MetricType.Proactive }}</label>
              <mat-icon matTooltipClass="linebreak" style="font-size: 15px"
                        [matTooltip]="'Example:\\n\\nIdentify the problem e.g. I get headaches because I don\\´t drink enough water (Problem).\\n\\nSolve the problem e.g. drink 3 liters of water each day (Solution).'">
                help
              </mat-icon>
            </ng-template>
            @if (proactiveHabitsRowData) {
              <app-habit-table [rowData]="proactiveHabitsRowData"
                               [colDefs]="typeBasedColDefs(MetricType.Proactive)"></app-habit-table>
            }
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <label>{{ MetricType.Reactive }}</label>
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
  proactiveHabitsRowData: any[] = []; // TODO Typ anpassen
  reactiveHabitsRowData: any[] = []; // TODO Typ anpassen
  @Input() userWithHabits: UserWithHabits | undefined;
  protected readonly MetricType = HabitType;

  ngOnInit(): void {
    if (this.userWithHabits) {
      this.proactiveHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.Proactive);
      this.reactiveHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.Reactive);
    }
  }

  typeBasedColDefs(metricType: HabitType): (ColDef | ColGroupDef)[] {
    const PROGRESS_COLS = [PROGRESS_TODAY_COL, PROGRESS_1_DAY_AGO_COL, PROGRESS_2_DAYS_AGO_COL, PROGRESS_3_DAY_AGO_COL, PROGRESS_4_DAY_AGO_COL, PROGRESS_5_DAY_AGO_COL, PROGRESS_6_DAY_AGO_COL, PROGRESS_7_DAY_AGO_COL, PROGRESS_WEEK_COL, PROGRESS_MONTH_COL, PROGRESS_FIRST_QUARTER_COL, PROGRESS_SECOND_QUARTER_COL, PROGRESS_THIRD_QUARTER_COL, PROGRESS_FOURTH_QUARTER_COL, PROGRESS_YEAR_COL];
    if (metricType === HabitType.Proactive) {
      return [ACTIONS_COL, METRIC_COL, SOLUTION_COL, PROBLEM_COL, ...PROGRESS_COLS];
    } else {
      return [ACTIONS_COL, METRIC_COL, TRIGGER_COL, PROBLEM_COL, SOLUTION_COL, ...PROGRESS_COLS];
    }
  }

  // filter habits based on MetricType
  private filterHabitsByType(habits: Habit[], type: HabitType): Habit[] {
    return habits.filter(habit => habit.type === type);
  }

  // build row data based on the MetricType
  private buildRowDataByType(habits: Habit[], type: HabitType): any[] {
    if (!habits) {
      return [];
    }
    return this.filterHabitsByType(habits, type).map(habit => {
      const rowData: any = {...habit};

      if (rowData.occurrences) {
        const sortedOccurrences = rowData.occurrences.sort((a: Occurrence, b: Occurrence) => new Date(b.date).getTime() - new Date(a.date).getTime());
        rowData.occurrences = sortedOccurrences.map((occurrence: Occurrence) => {
          const emoji = occurrence.value > 0 ? '👍' : '👎';
          const formattedDate = new Intl.DateTimeFormat('de').format(new Date(occurrence.date));
          return `${formattedDate} ${emoji}`;
        });
      }

      rowData.active = rowData.active ? 'Yes' : 'No';
      rowData.habit = habit;
      return rowData;
    });
  };
}

