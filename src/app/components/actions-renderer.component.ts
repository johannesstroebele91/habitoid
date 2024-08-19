import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-actions-renderer',
  standalone: true,
  template: `
    <button (click)="editHabit()" mat-icon-button aria-label="Edit habit"
            class="small-icon-button">
      <mat-icon>edit</mat-icon>
    </button>
    <button (click)="deleteHabit()" mat-icon-button aria-label="Delete habit" class="small-icon-button">
      <mat-icon>delete</mat-icon>
    </button>
  `,
  styles: [`
    .small-icon-button {
      width: 26px !important;
      height: 26px !important;
      padding: 0px !important;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;

      & > *[role=img] {
        width: 16px;
        height: 16px;
        font-size: 16px;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      .mat-mdc-button-touch-target {
        width: 26px !important;
        height: 26px !important;
      }
    }
  `],
  imports: [
    MatIcon,
    MatButton,
    MatIconButton
  ],
})
export class ActionsRenderer implements ICellRendererAngularComp {
  actions: string[] = [];

  agInit(params: ICellRendererParams): void {
    this.updateOccurrences(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
    this.updateOccurrences(params.value);
    return true;
  }

  editHabit() {

  }

  deleteHabit() {

  }

  private updateOccurrences(value: string[] | null | undefined): void {
    this.actions = value || [];
  }
}
