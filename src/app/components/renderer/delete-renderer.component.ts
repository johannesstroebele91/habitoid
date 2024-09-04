import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Habit, Occurrence} from "../../shared/models";

@Component({
  selector: 'app-delete-renderer',
  standalone: true,
  template: `
    <div style="position: relative; top: 3px">
      <button (click)="deleteHabit()" mat-icon-button aria-label="Delete habit" class="small-icon-button">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  imports: [
    MatIcon,
    MatButton,
    MatIconButton
  ],
})
export class DeleteRenderer implements ICellRendererAngularComp {
  occurrences: Occurrence[] = [];
  public habit: Habit | undefined;
  public params: any;

  agInit(params: ICellRendererParams): void {
    this.habit = params.value as Habit;
    this.params = params;
    this.updateOccurrences(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
    this.updateOccurrences(params.value);
    return true;
  }

  deleteHabit() {
    /* TODO delete einbauen für ag grid row
    const selectedRow = this.gridApi.getFocusedCell()
    const id = this.gridOptions.rowData[selectedRow.rowIndex].i

    this.gridOptions.rowData.splice(selectedRow.rowIndex, 1)
    this.gridApi.setRowData(this.gridOptions.rowData) */

  }

  private updateOccurrences(value: string[] | null | undefined): void {
    // TODO fix later
    // this.occurrences = value || [];
  }
}
