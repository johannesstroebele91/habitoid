import {Component} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {GridApi} from 'ag-grid-community';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {OccurrenceChipRenderer} from "./occurence-renderer.component";
import {ActionsRenderer} from "./actions-renderer.component";
import {UserWithHabits} from "../shared/models";

const testData: UserWithHabits[] = [
  {
    id: '1',
    name: 'John Doe',
    experience: 100,
    habits: [
      {
        solution: 'Exercise',
        challenge: 'Lack of time',
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
  ],
  template: `
    <mat-card appearance="outlined" style="margin: 1%">
      <mat-card-header style="display: flex; justify-content: space-between; align-items: center;">
        <mat-card-title>Habits</mat-card-title>
        <mat-form-field>
          <mat-label>Quick Filter</mat-label>
          <input matInput type="text" [(ngModel)]="quickFilterValue" id="filter-text-box"
                 (input)="onQuickFilterSearch()">
          <button *ngIf="quickFilterValue" matSuffix mat-icon-button aria-label="Clear" (click)="quickFilterValue=''">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </mat-card-header>
      <mat-card-content>
        <ag-grid-angular
          [rowData]="rowData"
          [columnDefs]="colDefs"
          class="ag-theme-balham"
          (gridReady)="onGridReady($event)"
          [rowDragManaged]="true"
          style="height: 70vh"
        ></ag-grid-angular>
      </mat-card-content>
    </mat-card>
  `,
})
export class AgGridComponent {
  rowData: any[] = [];
  quickFilterValue = '';
  private centerCell = {
    display: "flex",
    justifyContent: "center",
  }
  colDefs: any[] = [
    {
      field: "actions",
      width: 80,
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
    },
    {field: "solution", headerName: "💡Solution", filter: 'agTextColumnFilter', width: 140},
    {field: "challenge", headerName: "🏔️Challenge", filter: 'agTextColumnFilter', width: 140},
    {field: "consequence", headerName: "⛔Consequence", filter: 'agTextColumnFilter', width: 140},
    {
      field: "monday",
      headerName: "Mon",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
      width: 50
    },
    {
      field: "tuesday",
      headerName: "Tue",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
      width: 50
    },
    {
      field: "wednesday",
      headerName: "Wed",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
      width: 50
    },
    {
      field: "thursday",
      headerName: "Thu",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
      width: 50
    },
    {
      field: "friday",
      headerName: "Fri",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
      width: 50
    },
    {
      field: "saturday",
      headerName: "Sat",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
      width: 50
    },
    {
      field: "sunday",
      headerName: "Sun",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellClass: this.centerCell,
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
}
