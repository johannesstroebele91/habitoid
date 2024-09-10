import {PostHabitDialogComponent} from "../components/habits/post-habit-dialog.component";
import {Habit, Occurrence} from "./models";
import {MatDialog} from "@angular/material/dialog";

export const postHabit = (dialog: MatDialog, habit?: Habit): void => {
  const dialogRef = dialog.open(PostHabitDialogComponent, {
    data: habit
  });
  // TODO fix later to work with new or changed habit
  dialogRef.afterClosed().subscribe((result: any) => {
    console.log(`Dialog result: ${result}`);
  });
}

const TODAY = new Date();
const TODAY_DATE_ONLY = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());

// Calculate positive and negative accumulations of relevant occurrences based on progress date
export function calcPosNegSumRelOccurrences(occurrences: Occurrence[], field: string): {
  negativeSumRelOccurrences: number,
  positiveSumRelOccurrences: number
} {
  const dateRange = getDateRangeFromField(field);
  if (dateRange === null) {
    console.error(`Unrecognized field: ${field}`);
    return {negativeSumRelOccurrences: 0, positiveSumRelOccurrences: 0};
  } else {
    const {startDate, endDate} = dateRange;
    let positiveSumRelOccurrences = 0;
    let negativeSumRelOccurrences = 0;

    filterOccurrencesByDateRange(occurrences, startDate, endDate).forEach((occurrence: Occurrence) => {
      if (occurrence.value > 0) {
        positiveSumRelOccurrences += occurrence.value;
      } else {
        negativeSumRelOccurrences += occurrence.value;
      }
    });
    return {negativeSumRelOccurrences, positiveSumRelOccurrences}
  }
}

// Get the start and end dates based on the field
export function getDateRangeFromField(field: string): { startDate: Date, endDate: Date } | null {
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  switch (field) {
    case 'today':
      startDate = TODAY_DATE_ONLY;
      endDate = TODAY_DATE_ONLY;
      break;
    case '1-day-ago':
    case '2-days-ago':
    case '3-days-ago':
    case '4-days-ago':
    case '5-days-ago':
    case '6-days-ago':
    case '7-days-ago':
      const daysAgo = getDaysAgoFromField(field);
      startDate = new Date(TODAY_DATE_ONLY);
      startDate.setDate(TODAY_DATE_ONLY.getDate() - daysAgo);
      endDate = startDate;
      break;
    case 'week':
      startDate = new Date(TODAY_DATE_ONLY);
      startDate.setDate(TODAY_DATE_ONLY.getDate() - 7);
      endDate = TODAY_DATE_ONLY;
      break;
    case 'month':
      startDate = new Date(TODAY_DATE_ONLY);
      startDate.setMonth(TODAY_DATE_ONLY.getMonth() - 1);
      endDate = TODAY_DATE_ONLY;
      break;
    case '1-quarter':
      startDate = getQuarterStartDate(1);
      endDate = getQuarterEndDate(1);
      break;
    case '2-quarter':
      startDate = getQuarterStartDate(2);
      endDate = getQuarterEndDate(2);
      break;
    case '3-quarter':
      startDate = getQuarterStartDate(3);
      endDate = getQuarterEndDate(3);
      break;
    case '4-quarter':
      startDate = getQuarterStartDate(4);
      endDate = getQuarterEndDate(4);
      break;
    case 'year':
      startDate = new Date(TODAY_DATE_ONLY);
      startDate.setFullYear(TODAY_DATE_ONLY.getFullYear() - 1);
      endDate = TODAY_DATE_ONLY;
      break;
    default:
      return null;
  }

  return {startDate, endDate};
}

// Function to filter occurrences by date range
export function filterOccurrencesByDateRange(
  occurrences: Occurrence[] | undefined,
  startDate: Date,
  endDate: Date
): Occurrence[] {
  if (!occurrences) return [];

  return occurrences.filter((occurrence: Occurrence) => {
    const occurrenceDateOnly = new Date(occurrence.date.getFullYear(), occurrence.date.getMonth(), occurrence.date.getDate());
    return occurrenceDateOnly >= startDate && occurrenceDateOnly <= endDate;
  });
}

// Extracting days from fields like "1-day-ago"
export function getDaysAgoFromField(field: string | undefined): number {
  const match = field?.match(/^(\d+)-days?-ago$/);
  return match && match[1] ? parseInt(match[1], 10) : 0;
}

// Get the start date of a specific quarter
export function getQuarterStartDate(quarter: number): Date {
  const year = TODAY_DATE_ONLY.getFullYear();
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

// Get the end date of a specific quarter
export function getQuarterEndDate(quarter: number): Date {
  const year = TODAY_DATE_ONLY.getFullYear();
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
