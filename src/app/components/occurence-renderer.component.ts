import {Component} from '@angular/core';
import {MatChip, MatChipSet} from "@angular/material/chips";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-occurrence-chip-renderer',
  standalone: true,
  template: `
    <mat-chip-set *ngIf="occurrences?.length">
      <mat-chip *ngFor="let occurrence of occurrences">
        {{ occurrence }}
      </mat-chip>
    </mat-chip-set>
  `,
  imports: [
    MatChip,
    NgForOf,
    MatChipSet,
    NgIf
  ],
  styles: [
    `
      mat-chip {
        margin: 2px;
      }
    `
  ]
})
export class OccurrenceChipRenderer implements ICellRendererAngularComp {
  occurrences: string[] = [];

  agInit(params: ICellRendererParams): void {
    this.updateOccurrences(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
    this.updateOccurrences(params.value);
    return true;
  }

  private updateOccurrences(value: string[] | null | undefined): void {
    this.occurrences = value || [];
  }
}
