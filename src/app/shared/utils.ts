import {PostHabitDialogComponent} from "../components/habits/post-habit-dialog.component";
import {Habit} from "./models";
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
