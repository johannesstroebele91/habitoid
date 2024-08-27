import {HabitType} from "./models";
import {ColDef, ColGroupDef} from "ag-grid-community";
import {ActionsRenderer} from "../components/renderer/actions-renderer.component";
import {OccurrenceChipRenderer} from "../components/renderer/occurence-renderer.component";
import {MetricRenderer} from "../components/renderer/metric-renderer.component";

export const ERROR_MESSAGE = 'You must enter a valid value';

const centerCell = {
  display: "flex",
  justifyContent: "center",
};

// General
export const ACTIONS_COL: (ColDef | ColGroupDef) =
  {
    field: "actions",
    width: 95,
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    rowDrag: true,
    headerTooltip: "Rows are not draggable when sorted",
    pinned: 'left'
  };
export const REASON_COL: (ColDef | ColGroupDef) = {
  field: "reason",
  headerName: "🔍Reason",
  headerTooltip: "Why is it important to do?",
  filter: 'agTextColumnFilter',
  width: 180
};

// Proactive Habit
export const GOAL_COL: (ColDef | ColGroupDef) = {
  field: "goal",
  headerName: "🎯Goal",
  headerTooltip: "What should I do",
  filter: 'agTextColumnFilter',
  width: 180,
  pinned: 'left'
};

// Reactive Habit
export const SOLUTION_COL: (ColDef | ColGroupDef) = {
  field: "solution",
  headerName: "🎯Solution",
  headerTooltip: "How to fix what I reactively do wrong",
  filter: 'agTextColumnFilter',
  width: 180,
  pinned: 'left'
};
export const TRIGGER_COL: (ColDef | ColGroupDef) = {
  field: "trigger",
  headerName: "⚠️Trigger",
  headerTooltip: "What triggers the bad habit? (e.g. When I hit a wall on a task, I go on YouTube)",
  filter: 'agTextColumnFilter',
  width: 240,
  pinned: 'left'
};

// Progress
export const PROGRESS_TODAY_COL: (ColDef | ColGroupDef) = {
  field: "today",
  headerName: "Today",
  cellRenderer: (params: any) => {
    console.log(params);
    return `<div class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-indeterminate ag-disabled" style="position: relative; top: -1px"><input type='checkbox' ${params.value ? 'checked' : ''} class="ag-input-field-input ag-checkbox-input" disabled /></div>`;
  },
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_1_DAY_AGO_COL: (ColDef | ColGroupDef) = {
  field: "1-day-ago",
  headerName: "1 day ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_2_DAYS_AGO_COL: (ColDef | ColGroupDef) = {
  field: "2-days-ago",
  headerName: "2 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_3_DAY_AGO_COL: (ColDef | ColGroupDef) = {
  field: "3-days-ago",
  headerName: "3 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_4_DAY_AGO_COL: (ColDef | ColGroupDef) = {
  field: "4-days-ago",
  headerName: "4 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_5_DAY_AGO_COL: (ColDef | ColGroupDef) = {
  field: "5-days-ago",
  headerName: "5 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_6_DAY_AGO_COL: (ColDef | ColGroupDef) = {
  field: "6-days-ago",
  headerName: "6 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_7_DAY_AGO_COL: (ColDef | ColGroupDef) = {
  field: "7-days-ago",
  headerName: "7 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const OCCURRENCES_COL: (ColDef | ColGroupDef) = {
  field: "occurrences",
  width: 500,
  headerName: "🗓️Last Occurrences",
  cellRenderer: OccurrenceChipRenderer,
};
export const PROACTIVE_METRIC_COL: ColDef = {
  field: HabitType.Proactive.toLowerCase(),
  headerName: "Metric",
  headerTooltip: "Scheduled amount to reach in a certain time frame (e.g. walk 10000 steps each day)", // TODO fix
  width: 105,
  cellEditor: "agNumberCellEditor",
  editable: true,
  cellRenderer: () => '<span style="color: grey;">Insert progress</span>'
}
export const REACTIVE_METRIC_COL: ColDef = {
  field: HabitType.Reactive.toLowerCase(),
  headerName: "Metric",
  headerTooltip: "Positive or negative feedback based on a negative trigger (e.g. watching YouTube when you feel stressed)", // TODO fix
  cellRenderer: MetricRenderer,
  cellStyle: centerCell,
  width: 60
}
