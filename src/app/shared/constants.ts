import {Habit, MetricType} from "./models";
import {ColDef, ColGroupDef} from "ag-grid-community";
import {ActionsRenderer} from "../components/renderer/actions-renderer.component";
import {OccurrenceChipRenderer} from "../components/renderer/occurence-renderer.component";
import {MetricRenderer} from "../components/renderer/metric-renderer.component";

export const ERROR_MESSAGE = 'You must enter a valid value';

const centerCell = {
  display: "flex",
  justifyContent: "center",
};

export const ACTIONS_COL: (ColDef | ColGroupDef) =
  {
    field: "actions",
    width: 110,
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    rowDrag: true,
    headerTooltip: "Rows not draggable when sorted",
    pinned: 'left'
  };
export const SOLUTION_COL: (ColDef | ColGroupDef) = {
  field: "solution",
  headerName: "🎯Solution",
  headerTooltip: "How to improve?",
  filter: 'agTextColumnFilter',
  width: 240,
  pinned: 'left'
};

export const PROBLEM_COL: (ColDef | ColGroupDef) = {
  field: "problem",
  headerName: "⚠️Problem",
  headerTooltip: "What am I doing wrong?",
  filter: 'agTextColumnFilter',
  width: 240,
  pinned: 'left'
};
export const REASON_COL: (ColDef | ColGroupDef) = {
  field: "reason",
  headerName: "🔍Reason",
  headerTooltip: "Why is it important to fix?",
  filter: 'agTextColumnFilter',
  width: 200
};
export const PROGRESS_COL: (ColDef | ColGroupDef) = {
  field: "progress",
  headerName: "Progress",
  width: 80,
};
export const MONDAY_COL: (ColDef | ColGroupDef) = {
  field: "monday",
  headerName: "Mon",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const TUESDAY_COL: (ColDef | ColGroupDef) = {
  field: "tuesday",
  headerName: "Tue",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const WEDNESDAY_COL: (ColDef | ColGroupDef) = {
  field: "wednesday",
  headerName: "Wed",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const THURSDAY_COL: (ColDef | ColGroupDef) = {
  field: "thursday",
  headerName: "Thu",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const FRIDAY_COL: (ColDef | ColGroupDef) = {
  field: "friday",
  headerName: "Fri",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const SATURDAY_COL: (ColDef | ColGroupDef) = {
  field: "saturday",
  headerName: "Sat",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const SUNDAY_COL: (ColDef | ColGroupDef) = {
  field: "sunday",
  headerName: "Sun",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 50
};
export const OCCURRENCES_COL: (ColDef | ColGroupDef) = {
  field: "occurrences",
  width: 500,
  headerName: "🗓️Last Occurrences",
  cellRenderer: OccurrenceChipRenderer,
};
export const REPETITION_METRIC_COL: ColDef = {
  field: "goal",
  headerName: "Goal",
  headerTooltip: "Scheduled Completion Goal", // TODO fix
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 80
}
export const GOAL_METRIC_COL: ColDef = {
  field: "goal",
  headerName: "Goal",
  headerTooltip: "Scheduled Repetition Goal", // TODO fix
  width: 120,
  cellEditor: "agNumberCellEditor",
  editable: true,
  cellRenderer: () => '<span style="color: grey;">Insert progress</span>'
}
export const REACTION_METRIC_COL: ColDef = {
  field: "reaction",
  headerName: "Reaction",
  headerTooltip: "Irregular PosNeg Feedback", // TODO fix
  cellRenderer: MetricRenderer,
  cellStyle: centerCell,
  width: 80
}
