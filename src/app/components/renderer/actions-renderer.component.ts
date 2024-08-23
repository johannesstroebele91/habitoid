import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-actions-renderer',
  standalone: true,
  template: `
    <button (click)="editHabit()" mat-icon-button aria-label="Edit habit" style="margin-right: 5px"
            class="small-icon-button">
      <mat-icon>edit</mat-icon>
    </button>
    <button (click)="deleteHabit()" mat-icon-button aria-label="Delete habit" class="small-icon-button">
      <mat-icon>delete</mat-icon>
    </button>
  `,
  imports: [
    MatIcon,
    MatButton,
    MatIconButton
  ],
})
export class ActionsRenderer implements ICellRendererAngularComp {
  actions: string[] = [];

  agInit(params: ICellRendererParams): void {
    this.updateActions(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
    this.updateActions(params.value);
    return true;
  }

  editHabit() {

  }

  deleteHabit() {

  }

  private updateActions(value: string[] | null | undefined): void {
    this.actions = value || [];
  }
}
