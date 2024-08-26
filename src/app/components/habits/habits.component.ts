import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule,} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {Habit, MetricType, Occurrence, UserWithHabits} from "../../shared/models";
import {
    ACTIONS_COL,
    FRIDAY_COL,
    GOAL_METRIC_COL,
    MONDAY_COL,
    OCCURRENCES_COL,
    PROBLEM_COL,
    PROGRESS_COL,
    REACTION_METRIC_COL,
    REASON_COL,
    REPETITION_METRIC_COL,
    SATURDAY_COL,
    SOLUTION_COL,
    SUNDAY_COL,
    THURSDAY_COL,
    TUESDAY_COL,
    WEDNESDAY_COL
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
                            <span>{{ MetricType.Repetition }}</span>
                        </ng-template>
                        <app-habit-table [rowData]="repetitionRowData"
                                         [colDefs]="typeBasedColDefs(MetricType.Repetition)"></app-habit-table>
                    </mat-tab>
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon style="margin-right: 3px">flag</mat-icon>
                            <span>{{ MetricType.Goal }}</span>
                        </ng-template>
                        <app-habit-table [rowData]="goalRowData"
                                         [colDefs]="typeBasedColDefs(MetricType.Goal)"></app-habit-table>
                    </mat-tab>
                    <mat-tab>
                        <ng-template mat-tab-label>
                            <mat-icon style="margin-right: 5px">thumb_up</mat-icon>
                            <span>{{ MetricType.Reaction }}</span>
                        </ng-template>
                        <app-habit-table [rowData]="reactionRowData"
                                         [colDefs]="typeBasedColDefs(MetricType.Reaction)"></app-habit-table>
                    </mat-tab>
                </mat-tab-group>
            </mat-card-content>
        </mat-card>
    `,
})
export class HabitsComponent implements OnChanges{
    repetitionRowData: any[] = []; // TODO Typ anpassen
    goalRowData: any[] = []; // TODO Typ anpassen
    reactionRowData: any[] = []; // TODO Typ anpassen
    @Input() userWithHabits: UserWithHabits | undefined;
    protected readonly MetricType = MetricType;

    // TODO besser Lösung einbauen
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userWithHabits'] && this.userWithHabits) {
            this.repetitionRowData = this.buildRowDataByType(this.userWithHabits.habits, MetricType.Repetition);
            this.goalRowData = this.buildRowDataByType(this.userWithHabits.habits, MetricType.Goal);
            this.reactionRowData = this.buildRowDataByType(this.userWithHabits.habits, MetricType.Reaction);
        }
    }

    typeBasedColDefs(metricType: MetricType): (ColDef | ColGroupDef)[] {
        switch (metricType) {
            case MetricType.Repetition:
                return [ACTIONS_COL, SOLUTION_COL, PROBLEM_COL, REPETITION_METRIC_COL, MONDAY_COL, TUESDAY_COL, WEDNESDAY_COL, THURSDAY_COL, FRIDAY_COL, SATURDAY_COL, SUNDAY_COL, OCCURRENCES_COL];
            case MetricType.Goal:
                return [ACTIONS_COL, SOLUTION_COL, PROBLEM_COL, GOAL_METRIC_COL, PROGRESS_COL, MONDAY_COL, TUESDAY_COL, WEDNESDAY_COL, THURSDAY_COL, FRIDAY_COL, SATURDAY_COL, SUNDAY_COL, OCCURRENCES_COL];
            case MetricType.Reaction:
                return [ACTIONS_COL, PROBLEM_COL, REASON_COL, SOLUTION_COL, REACTION_METRIC_COL, MONDAY_COL, TUESDAY_COL, WEDNESDAY_COL, THURSDAY_COL, FRIDAY_COL, SATURDAY_COL, SUNDAY_COL, OCCURRENCES_COL];
            default:
                return [ACTIONS_COL, SOLUTION_COL, PROBLEM_COL, REASON_COL, PROGRESS_COL, REACTION_METRIC_COL, MONDAY_COL, TUESDAY_COL, WEDNESDAY_COL, THURSDAY_COL, FRIDAY_COL, SATURDAY_COL, SUNDAY_COL, OCCURRENCES_COL];
        }
    }

    // filter habits based on MetricType
    private filterHabitsByType(habits: Habit[], type: MetricType): Habit[] {
        return habits.filter(habit => habit.measurement.type === type);
    }

    // build row data based on the MetricType
    private buildRowDataByType(habits: Habit[] | undefined, type: MetricType): any[] {
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

