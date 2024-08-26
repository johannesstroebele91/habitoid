import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule,} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {Occurrence, UserWithHabits} from "../../shared/models";
import {DEFAULT_COL_DEFS, TESTDATA_USERS_WITH_HABIT} from "../../shared/constants";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {HabitTableComponent} from "./habit-table.component";

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
                    <mat-tab label="Frequentive">
                        <app-habit-table [rowData]="rowData" [colDefs]="DEFAULT_COL_DEFS"></app-habit-table>
                    </mat-tab>
                    <mat-tab label="Quantative">
                        <app-habit-table [rowData]="rowData" [colDefs]="DEFAULT_COL_DEFS"></app-habit-table>
                    </mat-tab>
                    <mat-tab label="Reactive">
                        <app-habit-table [rowData]="rowData" [colDefs]="DEFAULT_COL_DEFS"></app-habit-table>
                    </mat-tab>
                </mat-tab-group>
            </mat-card-content>
        </mat-card>
    `,
})
export class HabitsComponent {
    rowData: any[] = []; // TODO Typ anpassen
    @Input() userWithHabits!: UserWithHabits | undefined;
    protected readonly DEFAULT_COL_DEFS = DEFAULT_COL_DEFS;

    constructor() {
        this.rowData = this.buildRowData(TESTDATA_USERS_WITH_HABIT);
    }

    buildRowData(users: UserWithHabits[]): any[] {
        return users.flatMap(user =>
            user.habits.map(habit => {
                const rowData: any = {...habit};

                if (rowData.occurrences) {
                    const sortedOccurrences = rowData.occurrences.sort((a: Occurrence, b: Occurrence) => b.date.getTime() - a.date.getTime());
                    rowData.occurrences = sortedOccurrences.map((occurrence: Occurrence) => {
                        const emoji = occurrence.value > 0 ? '👍' : '👎';
                        const formattedDate = new Intl.DateTimeFormat('de').format(occurrence.date);
                        return `${formattedDate} ${emoji}`;
                    });
                }

                rowData.active = rowData.active ? 'Yes' : 'No';

                return rowData;
            })
        );
    }
}

