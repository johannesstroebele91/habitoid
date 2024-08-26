import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-metric-renderer',
  standalone: true,
  template: `
    <div style="position: relative; top: 3px">
      <button (click)="test()" mat-mini-fab color="primary" aria-label="Edit habit" style="margin-right: 5px"
              class="small-icon-button">
        <mat-icon>add</mat-icon>
      </button>
      <button (click)="test()" mat-mini-fab color="accent" aria-label="Delete habit"
              class="small-icon-button">
        <mat-icon>remove</mat-icon>
      </button>
    </div>
  `,
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    MatMiniFabButton,
    MatCheckbox,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf
  ],
})
export class MetricRenderer implements ICellRendererAngularComp {
  actions: string[] = [];
  checked: boolean = false;
  value: any;

  agInit(params: ICellRendererParams): void {
    this.updateMetric(params.value);
  }

  refresh(params: ICellRendererParams): boolean {
    this.updateMetric(params.value);
    return true;
  }

  test() {

  }

  addValue() {

  }

  private updateMetric(value: string[] | null | undefined): void {
    this.actions = value || [];
  }
}
