import {ChangeDetectionStrategy, Component, inject, Input} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {CellEditingStoppedEvent, ColDef, ColGroupDef, GridApi} from 'ag-grid-community';
import {MatFormFieldModule,} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import { MatInputModule} from "@angular/material/input";
import {OccurrenceChipRenderer} from "../renderer/occurence-renderer.component";
import {Habit, Occurrence, UserWithHabits} from "../../shared/models";
import {TESTDATA_USERS_WITH_HABIT} from "../../shared/constants";
import {ActionsRenderer} from "../renderer/actions-renderer.component";
import {MetricRenderer} from "../renderer/metric-renderer.component";
import {MatDialog} from "@angular/material/dialog";
import {PostHabitDialogComponent} from "./post-habit-dialog.component";

const centerCell = {
  display: "flex",
  justifyContent: "center",
};

const colDefs: (ColDef | ColGroupDef)[] = [
  {
    field: "actions",
    width: 110,
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    rowDrag: true,
    headerTooltip: "Rows not draggable when sorted",
    pinned: 'left'
  },
  {
    field: "solution",
    headerName: "🎯Solution",
    headerTooltip: "How to improve?",
    filter: 'agTextColumnFilter',
    width: 240,
    pinned: 'left'
  },
  {
    field: "problem",
    headerName: "⚠️Problem",
    headerTooltip: "What am I doing wrong?",
    filter: 'agTextColumnFilter',
    width: 240,
    pinned: 'left'
  },
  {
    field: "reason",
    headerName: "🔍Reason",
    headerTooltip: "Why is it important to fix?",
    filter: 'agTextColumnFilter',
    width: 200
  },
  {
    headerName: "Measurement",
    children: [
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
    ]
  },
  {
    headerName: "Progress",
    children: [
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
        /* TODO evtl. später wieder rauslöschen*/
        field: "occurrences",
        width: 500,
        headerName: "🗓️Last Occurrences",
        cellRenderer: OccurrenceChipRenderer,
      },
    ]
  },
];

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatCard, MatCardContent, MatFabButton, FormsModule, MatIconButton, NgIf, AgGridAngular
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Fill form field</mat-label>
      <input matInput placeholder="Placeholder">
      <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
      <mat-hint>Hint</mat-hint>
    </mat-form-field>

    <mat-card appearance="outlined" style="margin: 1%">
      <mat-card-content>
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
          <button mat-fab extended aria-label="Add habit" color="primary"
                  (click)="postHabit()" style="height: 40px">
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
export class HabitsComponent {
  readonly dialog = inject(MatDialog);
  rowData: any[] = []; // TODO Typ anpassen
  quickFilterValue = '';
  @Input() userWithHabits!: UserWithHabits | undefined;
  protected readonly colDefs = colDefs;
  private gridApi!: GridApi;

  constructor() {
    this.rowData = this.buildRowData(TESTDATA_USERS_WITH_HABIT);
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

  postHabit(habit?: Habit): void {
    const dialogRef = this.dialog.open(PostHabitDialogComponent, {
      data: habit
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

