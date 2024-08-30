import {Component, inject} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Habit} from "../../shared/models";
import {postHabit} from "../../shared/utils";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-actions-renderer',
  standalone: true,
  template: `
    <div style="position: relative; top: 3px">
      <button (click)="editHabit()" mat-icon-button aria-label="Edit habit" style="margin-right: 5px"
              class="small-icon-button">
        <mat-icon>edit</mat-icon>
      </button>
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
export class ActionsRenderer implements ICellRendererAngularComp {
  actions: string[] = [];
  public habit: Habit | undefined;
  public params: any;
  readonly dialog = inject(MatDialog);

  agInit(params: ICellRendererParams): void {
    this.habit = params.value as Habit;
    this.params = params;
    this.updateActions(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
    this.updateActions(params.value);
    return true;
  }

  editHabit(): void {
    postHabit(this.dialog, this.params.data.habit);
  }

  deleteHabit() {
  }

  private updateActions(value: string[] | null | undefined): void {
    this.actions = value || [];
  }
}
