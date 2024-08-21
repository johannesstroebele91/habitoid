import {Component} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CellEditingStoppedEvent, GridApi} from 'ag-grid-community';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {OccurrenceChipRenderer} from "./occurence-renderer.component";
import {ActionsRenderer} from "./actions-renderer.component";
import {HabitType, UserWithHabits} from "../shared/models";
import {RouterLink} from "@angular/router";
import {MetricRenderer} from "./metric-renderer.component";

const centerCell = {
  display: "flex",
  justifyContent: "center",
};

const testData: UserWithHabits[] = [
  {
    id: '1',
    name: 'John Doe',
    experience: 100,
    habits: [
      {
        solution: 'Exercise',
        challenge: 'Lack of time',
        type: HabitType.event,
        consequence: 'Decreased stamina',
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
        ]
      },
      {
        solution: 'Reading',
        challenge: 'Distractions',
        consequence: 'Slower learning',
        type: HabitType.event,
        active: false,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-01'), value: -1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        solution: 'Meditation',
        challenge: 'Stress',
        consequence: 'Anxiety',
        type: HabitType.event,
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    experience: 200,
    habits: [
      {
        solution: 'Yoga',
        challenge: 'Inconsistent schedule',
        consequence: 'Back pain',
        active: true,
        type: HabitType.event,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        solution: 'Cooking',
        challenge: 'Lack of ingredients',
        consequence: 'Unhealthy eating',
        type: HabitType.event,
        active: false,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-02'), value: -1},
        ]
      }
    ]
  }
];


@Component({
  selector: 'app-grid-component',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    AgGridAngular,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    NgIf,
    OccurrenceChipRenderer,
    MatInput,
    RouterLink,
  ],
  template: `
    <mat-card appearance="outlined" style="margin: 1%">
      <mat-card-content>
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
          <button mat-fab extended aria-label="Add habit" color="primary"
                  (click)="addHabit()" style="height: 40px">
            <mat-icon>add</mat-icon>
            Add Habit
          </button>

          <mat-form-field subscriptSizing="dynamic">
            <mat-label>Quick Filter</mat-label>
            <input matInput type="text" [(ngModel)]="quickFilterValue" id="filter-text-box"
                   (input)="onQuickFilterSearch()">
            <button *ngIf="quickFilterValue" matSuffix mat-icon-button aria-label="Clear" (click)="quickFilterValue=''">
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
        </div>

        <ag-grid-angular
          [rowData]="rowData"
          [columnDefs]="colDefs"
          class="ag-theme-balham"
          (gridReady)="onGridReady($event)"
          [rowDragManaged]="true"
          (cellEditingStopped)="onCellEditingStopped($event)"
          style="height: 70vh"
        />
      </mat-card-content>
    </mat-card>
  `,
})
export class AgGridComponent {
  rowData: any[] = [];
  quickFilterValue = '';

  colDefs: any[] = [
    {
      field: "actions",
      width: 110,
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
      rowDrag: true,
      headerTooltip: "Rows not draggable when sorted",
    },
    {
      field: "solution",
      headerName: "🎯Solution",
      headerTooltip: "How to improve?",
      filter: 'agTextColumnFilter',
      width: 140
    },
    {
      field: "problem",
      headerName: "⚠️Problem",
      headerTooltip: "What am I doing wrong?",
      filter: 'agTextColumnFilter',
      width: 140
    },
    {
      field: "reason",
      headerName: "🔍Reason",
      headerTooltip: "Why is it important to fix?",
      filter: 'agTextColumnFilter',
      width: 140
    },
    {
      field: "metric",
      headerName: "🛠️Metric",
      headerTooltip: "How is it measured?",
      width: 120,
      cellEditor: "agNumberCellEditor",
      editable: true,
      cellRenderer: () => '<span style="color: grey;">Insert progress</span>'
    },
    {
      field: "metric",
      headerName: "🛠️Metric",
      headerTooltip: "How is it measured?",
      cellRenderer: MetricRenderer,
      cellStyle: centerCell,
      width: 80
    },
    {
      field: "metric",
      headerName: "🛠️Metric",
      headerTooltip: "FIX!!!!?",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 80
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 80,
    },
    {
      field: "monday",
      headerName: "Mon",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "tuesday",
      headerName: "Tue",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "wednesday",
      headerName: "Wed",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "thursday",
      headerName: "Thu",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "friday",
      headerName: "Fri",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "saturday",
      headerName: "Sat",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "sunday",
      headerName: "Sun",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellStyle: centerCell,
      width: 50
    },
    {
      field: "occurrences",
      hide: true,
      width: 500,
      headerName: "🗓️Occurrences",
      cellRenderer: OccurrenceChipRenderer,
    },
  ];
  private gridApi!: GridApi;

  constructor() {
    this.rowData = this.buildRowData(testData);
  }

  onQuickFilterSearch() {
    if (this.gridApi) {
      this.gridApi.setGridOption(
        "quickFilterText",
        this.quickFilterValue,
      );
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  buildRowData(users: UserWithHabits[]): any[] {
    return users.flatMap(user =>
      user.habits.map(habit => {
        const sortedOccurrences = habit.occurrences?.sort((a, b) => b.date.getTime() - a.date.getTime());
        const formattedOccurrences = sortedOccurrences?.map(occurrence => {
          const emoji = occurrence.value > 0 ? '👍' : '👎';
          const formattedDate = new Intl.DateTimeFormat('de').format(occurrence.date);
          return `${formattedDate} ${emoji}`;
        });

        return {
          solution: habit.solution,
          challenge: habit.challenge,
          consequence: habit.consequence,
          active: habit.active ? 'Yes' : 'No',
          occurrences: formattedOccurrences
        };
      })
    );
  }

  addHabit() {

  }

  onCellEditingStopped($event: CellEditingStoppedEvent) {
    // Handle the logic after the editing metrics col stops
    if ($event.colDef.field === "metric") {
      const newProgressValue = $event.newValue;

      // Get the current value of the 'progress' column in the same row
      const oldProgressValueOrUndefined = $event.data.progress
      const oldProgressValue = oldProgressValueOrUndefined === undefined ? 0 : Number(oldProgressValueOrUndefined);

      // Trigger a change in 'progress' field
      $event.node.setDataValue('progress', newProgressValue + oldProgressValue);
    }
  }
}
