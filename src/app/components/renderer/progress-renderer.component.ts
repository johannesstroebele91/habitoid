import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Habit, Occurrence} from "../../shared/models";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {isEqual} from "lodash";

@Component({
  selector: 'app-progress-renderer',
  standalone: true,
  template: `
    @if (relevantOccurrences.length > 0) {
      <div *ngFor="let occurrence of relevantOccurrences">
        <span *ngIf="negativeSumRelOccurrences < 0"
              style="color: red; font-weight: bold;">{{ negativeSumRelOccurrences }}</span>
        <!-- TODO  -->
        <span *ngIf="negativeSumRelOccurrences < 0 && positiveSumRelOccurrences > 0"
              style="font-weight: bold"> / </span>
        <span *ngIf="positiveSumRelOccurrences > 0"
              style="color: green; font-weight: bold;">{{ positiveSumRelOccurrences }}</span>
        <!-- TODO *ngIf="positiveSum > 0" -->
      </div>
    } @else {
      <span style="color: grey; font-style: italic;">none</span>
    }
  `,
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
})
export class ProgressRenderer implements ICellRendererAngularComp {
  field: string | undefined = undefined;
  habit: Habit | undefined = undefined;
  relevantOccurrences: Occurrence[] = [];
  today = new Date();
  todayDateOnly = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  positiveSumRelOccurrences = 0;
  negativeSumRelOccurrences = 0;

  agInit(params: ICellRendererParams): void {
    this.field = params.colDef?.field;

    if (params.data.habit) {
      this.relevantOccurrences = this.updateRelevantOccurrences(params.data.habit);
      this.relevantOccurrences.forEach(occurrence => {
        if (occurrence.value > 0) {
          this.positiveSumRelOccurrences += occurrence.value;
        } else {
          this.negativeSumRelOccurrences += occurrence.value;
        }
      });
    } else {
      console.error('Habit data is undefined');
      this.relevantOccurrences = [];
    }

  }

  refresh(params: ICellRendererParams): boolean {
    if (params.data.habit) {
      const newHabit = {
        ...params.data.habit,
        occurrences: params.data.habit.occurrences?.map((occurrence: { value: string, date: string }) => ({
          value: occurrence.value,
          date: new Date(occurrence.date)
        }))
      };

      const updated = !isEqual(newHabit, this.habit);
      if (updated) {
        this.relevantOccurrences = this.updateRelevantOccurrences(params.data.habit);
      }
      return updated;
    }
    return false;
  }

  private updateRelevantOccurrences(habit: Habit): Occurrence[] {
    this.habit = habit;
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (this.field) {
      case 'today':
        startDate = this.todayDateOnly;
        endDate = this.todayDateOnly;
        break;
      case '1-day-ago':
      case '2-days-ago':
      case '3-days-ago':
      case '4-days-ago':
      case '5-days-ago':
      case '6-days-ago':
      case '7-days-ago':
        const daysAgo = this.getDaysAgoFromField(this.field);
        startDate = new Date(this.todayDateOnly);
        startDate.setDate(this.todayDateOnly.getDate() - daysAgo);
        endDate = startDate;
        break;
      case 'week':
        startDate = new Date(this.todayDateOnly);
        startDate.setDate(this.todayDateOnly.getDate() - 7);
        endDate = this.todayDateOnly;
        break;
      case 'month':
        startDate = new Date(this.todayDateOnly);
        startDate.setMonth(this.todayDateOnly.getMonth() - 1);
        endDate = this.todayDateOnly;
        break;
      case '1-quarter':
        startDate = this.getQuarterStartDate(1);
        endDate = this.getQuarterEndDate(1);
        break;
      case '2-quarter':
        startDate = this.getQuarterStartDate(2);
        endDate = this.getQuarterEndDate(2);
        break;
      case '3-quarter':
        startDate = this.getQuarterStartDate(3);
        endDate = this.getQuarterEndDate(3);
        break;
      case '4-quarter':
        startDate = this.getQuarterStartDate(4);
        endDate = this.getQuarterEndDate(4);
        break;
      case 'year':
        startDate = new Date(this.todayDateOnly);
        startDate.setFullYear(this.todayDateOnly.getFullYear() - 1);
        endDate = this.todayDateOnly;
        break;
      default:
        console.error(`Unrecognized field: ${this.field}`);
        return [];
    }

    // Normalize occurrence dates to remove the time component
    return this.habit?.occurrences?.filter((occurrence) => {
      const occurrenceDateOnly = new Date(occurrence.date.getFullYear(), occurrence.date.getMonth(), occurrence.date.getDate());
      if (startDate && endDate) {
        return occurrenceDateOnly >= startDate && occurrenceDateOnly <= endDate;
      }
      return false;
    }) || [];
  }

// Utility function for extracting days from fields like "1-day-ago"
  private getDaysAgoFromField(field: string | undefined): number {
    const match = field?.match(/^(\d+)-days?-ago$/);
    return match && match[1] ? parseInt(match[1], 10) : 0;
  }

// Utility function to get the start date of a specific quarter
  private getQuarterStartDate(quarter: number): Date {
    const year = this.todayDateOnly.getFullYear();
    switch (quarter) {
      case 1:
        return new Date(year, 0, 1);  // January 1
      case 2:
        return new Date(year, 3, 1);  // April 1
      case 3:
        return new Date(year, 6, 1);  // July 1
      case 4:
        return new Date(year, 9, 1);  // October 1
      default:
        throw new Error(`Invalid quarter: ${quarter}`);
    }
  }

// Utility function to get the end date of a specific quarter
  private getQuarterEndDate(quarter: number): Date {
    const year = this.todayDateOnly.getFullYear();
    switch (quarter) {
      case 1:
        return new Date(year, 2, 31); // March 31
      case 2:
        return new Date(year, 5, 30); // June 30
      case 3:
        return new Date(year, 8, 30); // September 30
      case 4:
        return new Date(year, 11, 31); // December 31
      default:
        throw new Error(`Invalid quarter: ${quarter}`);
    }
  }
}
