import {Component, inject, Input} from "@angular/core";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, ColGroupDef, GridApi} from "ag-grid-community";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {postHabit} from "../../shared/utils";

@Component({
  selector: "app-habit-table",
  standalone: true,
  imports: [
    AgGridAngular,
    MatFabButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `
    <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
      <button mat-fab extended aria-label="Add habit" color="primary"
              (click)="addHabit()" style="height: 40px">
        <mat-icon>add</mat-icon>
        Add
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
      style="height: 50vh"/>
    <!-- (cellEditingStopped)="onCellEditingStopped($event)" TODO überarbeiten -->
  `,
})
export class HabitTableComponent {
  @Input() rowData!: any[]; // TODO typ hinzufügen
  @Input() colDefs!: (ColDef | ColGroupDef)[];
  readonly dialog = inject(MatDialog);
  quickFilterValue = '';
  private gridApi!: GridApi;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onQuickFilterSearch() {
    if (this.gridApi) {
      this.gridApi.setGridOption(
        "quickFilterText",
        this.quickFilterValue,
      );
    }
  }

  addHabit(): void {
    postHabit(this.dialog);
  }

  /* TODO überarbeiten
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
  } */
}
