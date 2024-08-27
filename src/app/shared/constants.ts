import {MetricType} from "./models";
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
  headerTooltip: "How to create a positive habit",
  filter: 'agTextColumnFilter',
  width: 240,
  pinned: 'left'
};

export const TRIGGER_COL: (ColDef | ColGroupDef) = {
  field: "trigger",
  headerName: "⚠️Trigger",
  headerTooltip: "What triggers the negative habit? (e.g. I hit a wall on a task, so I go on YouTube)",
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
  field: MetricType.Repetition.toLowerCase(),
  headerName: MetricType.Repetition,
  headerTooltip: "Scheduled repetition to complete in a certain time frame (e.g. wake a walk 3 times per day)", // TODO fix
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 80
}
export const NUMERIC_METRIC_COL: ColDef = {
  field: MetricType.Numeric.toLowerCase(),
  headerName: MetricType.Numeric,
  headerTooltip: "Scheduled amount to reach in a certain time frame (e.g. walk 10000 steps each day)", // TODO fix
  width: 120,
  cellEditor: "agNumberCellEditor",
  editable: true,
  cellRenderer: () => '<span style="color: grey;">Insert progress</span>'
}
export const REACTION_METRIC_COL: ColDef = {
  field: MetricType.Reaction.toLowerCase(),
  headerName: MetricType.Reaction,
  headerTooltip: "Positive or negative feedback based on a negative trigger (e.g. watching YouTube when you feel stressed)", // TODO fix
  cellRenderer: MetricRenderer,
  cellStyle: centerCell,
  width: 80
}
