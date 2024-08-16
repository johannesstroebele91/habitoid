import {Component} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {GridApi} from 'ag-grid-community';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {UserWithHabits} from "../shared/models";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {OccurrenceChipRenderer} from "./occurence-renderer.component";

const testData: UserWithHabits[] = [
  {
    id: '1',
    name: 'John Doe',
    experience: 100,
    habits: [
      {
        name: 'Exercise',
        active: true,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
        ]
      },
      {
        name: 'Reading',
        active: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: -1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        name: 'Meditation',
        active: true,
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
        name: 'Yoga',
        active: true,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        name: 'Cooking',
        active: false,
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
  colDefs: any[] = [
    {field: "name", headerName: "Name", filter: 'agTextColumnFilter', width: "140"},
    {field: "active", headerName: "Active", filter: 'agTextColumnFilter', width: "100", sort: 'desc'},
    {
      field: "occurrences",
      width: 500,
      headerName: "Occurrences",
      cellRenderer: OccurrenceChipRenderer,
    }
  ];
  quickFilterValue = '';
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
          name: habit.name,
          active: habit.active ? 'Yes' : 'No',
          occurrences: formattedOccurrences  // Pass as an array
        };
      })
    );
  }
}
