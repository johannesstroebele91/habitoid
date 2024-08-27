import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
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
  PROGRESS_4_DAY_AGO_COL,
  PROGRESS_TODAY_COL,
  OCCURRENCES_COL,
  TRIGGER_COL,
  REACTIVE_METRIC_COL,
  REASON_COL,
  PROACTIVE_METRIC_COL,
  PROGRESS_5_DAY_AGO_COL,
  SOLUTION_COL,
  PROGRESS_6_DAY_AGO_COL,
  PROGRESS_3_DAY_AGO_COL,
  PROGRESS_1_DAY_AGO_COL,
  PROGRESS_2_DAYS_AGO_COL, PROGRESS_7_DAY_AGO_COL, GOAL_COL
} from "../../shared/constants";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {HabitTableComponent} from "./habit-table.component";
import {ColDef, ColGroupDef} from "ag-grid-community";

@Component({
    selector: 'app-habits',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTabsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCard, MatCardContent, MatFabButton, FormsModule, MatIconButton, NgIf, AgGridAngular, MatTabGroup, MatTab, HabitTableComponent
    ],
    template: `
      <mat-card appearance="outlined">
        <mat-card-content>
          <mat-tab-group>
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon style="margin-right: 3px">repeat</mat-icon>
                <span>{{ MetricType.Proactive }}</span>
              </ng-template>
              <app-habit-table [rowData]="proactiveHabitsRowData"
                               [colDefs]="typeBasedColDefs(MetricType.Proactive)"></app-habit-table>
            </mat-tab>
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon style="margin-right: 5px">thumb_up</mat-icon>
                <span>{{ MetricType.Reactive }}</span>
              </ng-template>
              <app-habit-table [rowData]="reactiveHabitsRowData"
                               [colDefs]="typeBasedColDefs(MetricType.Reactive)"></app-habit-table>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    `,
})
export class HabitsComponent implements OnChanges{
    proactiveHabitsRowData: any[] = []; // TODO Typ anpassen
    reactiveHabitsRowData: any[] = []; // TODO Typ anpassen
    @Input() userWithHabits: UserWithHabits | undefined;
    protected readonly MetricType = HabitType;

    // TODO besser Lösung einbauen
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userWithHabits'] && this.userWithHabits) {
            this.proactiveHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.Proactive);
            this.reactiveHabitsRowData = this.buildRowDataByType(this.userWithHabits.habits, HabitType.Reactive);
        }
    }

    typeBasedColDefs(metricType: HabitType): (ColDef | ColGroupDef)[] {
      const PROGRESS_COLS = [PROGRESS_TODAY_COL, PROGRESS_1_DAY_AGO_COL, PROGRESS_2_DAYS_AGO_COL, PROGRESS_3_DAY_AGO_COL, PROGRESS_4_DAY_AGO_COL, PROGRESS_5_DAY_AGO_COL, PROGRESS_6_DAY_AGO_COL, PROGRESS_7_DAY_AGO_COL, OCCURRENCES_COL];
      if(metricType === HabitType.Proactive) {
        return [ACTIONS_COL, GOAL_COL, REASON_COL, PROACTIVE_METRIC_COL, ...PROGRESS_COLS];
      } else {
        return [ACTIONS_COL, TRIGGER_COL, REASON_COL, SOLUTION_COL, REACTIVE_METRIC_COL, ...PROGRESS_COLS];
      }
    }

    // filter habits based on MetricType
    private filterHabitsByType(habits: Habit[], type: HabitType): Habit[] {
        return habits.filter(habit => habit.type === type);
    }

    // build row data based on the MetricType
    private buildRowDataByType(habits: Habit[] | undefined, type: HabitType): any[] {
        if (!habits) {
            return [];
        }
        return this.filterHabitsByType(habits, type).map(habit => {
            const rowData: any = {...habit};

            if (rowData.occurrences) {
                const sortedOccurrences = rowData.occurrences.sort((a: Occurrence, b: Occurrence) => new Date(b.date).getTime() - new Date (a.date).getTime());
                rowData.occurrences = sortedOccurrences.map((occurrence: Occurrence) => {
                    const emoji = occurrence.value > 0 ? '👍' : '👎';
                    const formattedDate = new Intl.DateTimeFormat('de').format(new Date(occurrence.date));
                    return `${formattedDate} ${emoji}`;
                });
            }

            rowData.active = rowData.active ? 'Yes' : 'No';

            return rowData;
        });
    };
}

