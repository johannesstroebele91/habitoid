import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {Habit, HabitType, Occurrence} from "../../shared/models";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {calcPosNegSumRelOccurrences} from "../../shared/utils";

@Component({
  selector: 'app-progress-renderer',
  standalone: true,
  template: `
    @if (type) {
      @if (type === HabitType.ProactiveCheckbox || type === HabitType.ProactiveNumeric) {
        <span style="font-weight: bold">{{ sumRelevantProactiveOccurrencesAsString }}</span>
      } @else if (type === HabitType.Reactive && (sumNegativeRelevantOccurrences < 0 || sumPositiveRelevantOccurrences > 0)) {
        <div>
          <span *ngIf="sumNegativeRelevantOccurrences"
                style="font-weight: bold; color: deeppink">{{ sumNegativeRelevantOccurrences }}</span>
          <span *ngIf="sumNegativeRelevantOccurrences < 0 && sumPositiveRelevantOccurrences > 0">/</span>
          <span *ngIf="sumPositiveRelevantOccurrences"
                style="font-weight: bold; color: black">{{ sumPositiveRelevantOccurrences }}</span>
        </div>
      } @else {
        <span style="color: grey; font-style: italic;">none</span>
      }
    }
  `,
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    NgIf,
    NgForOf,
    AsyncPipe,
    MatMiniFabButton,
    NgStyle,
    MatTooltip
  ],
})
export class ProgressRenderer implements ICellRendererAngularComp {
  protected habit: Habit | undefined = undefined;
  protected target = 0;
  protected type = HabitType.ProactiveCheckbox;
  protected unit = '';
  protected sumNegativeRelevantOccurrences: number = 0;
  protected sumPositiveRelevantOccurrences: number = 0;
  protected sumRelevantProactiveOccurrencesAsString: string = '';
  protected readonly HabitType = HabitType;

  agInit(params: ICellRendererParams): void {
    const habit = params.data;
    const field = params.colDef?.field;
    const occurrences = habit.occurrences;
    if (habit) {
      if (habit.type) this.type = habit.type;
      if (habit.metric?.target) {
        this.target = habit.metric.target
        console.log(this.target)
      }

      if (habit.metric?.unit) this.target = habit.metric.unit;

      if (occurrences) {
        if (this.type === HabitType.ProactiveCheckbox || this.type === HabitType.ProactiveNumeric) {
          occurrences.forEach((occurrence: Occurrence) => {
            this.sumPositiveRelevantOccurrences += occurrence.value;
          });
          this.sumRelevantProactiveOccurrencesAsString = `${this.sumPositiveRelevantOccurrences} / ${this.target} ${this.unit}${this.target === 1 ? '' : 's'}`;
        }

        if (this.type === HabitType.Reactive && field) {
          const {
            negativeSumRelOccurrences,
            positiveSumRelOccurrences
          } = calcPosNegSumRelOccurrences(occurrences, field);

          this.sumNegativeRelevantOccurrences = negativeSumRelOccurrences
          this.sumPositiveRelevantOccurrences = positiveSumRelOccurrences
        }
      }
    }
  }

  refresh(): boolean {
    // TODO change to true, if refresh necessary
    return false;
  }

}
