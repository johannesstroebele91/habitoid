import {HabitLabel} from "./models";
import {ColDef} from "ag-grid-community";
import {ActionsRenderer} from "../components/renderer/actions-renderer.component";
import {OccurrenceChipRenderer} from "../components/renderer/occurrence-renderer.component";
import {MetricRenderer} from "../components/renderer/metric-renderer.component";

const centerCell = {
  display: "flex",
  justifyContent: "center",
};

// General
export const ACTIONS_COL: (ColDef) =
  {
    field: "actions",
    width: 95,
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    rowDrag: true,
    headerTooltip: "Rows are not draggable when sorted",
    pinned: 'left'
  };
export const REASON_COL: (ColDef) = {
  field: HabitLabel.Reason.toLowerCase(),
  headerName: HabitLabel.Reason,
  headerTooltip: "Why is it important to do?",
  filter: 'agTextColumnFilter',
  width: 180
};
export const SOLUTION_COL: (ColDef) = {
  field: HabitLabel.Solution.toLowerCase(),
  headerName: HabitLabel.Solution,
  headerTooltip: "What should I do to improve",
  filter: 'agTextColumnFilter',
  width: 180,
  pinned: 'left'
};
export const PROACTIVE_METRIC_COL: ColDef = {
  field: HabitLabel.Metric.toLowerCase(),
  headerName: HabitLabel.Metric,
  headerTooltip: "Scheduled amount to reach in a certain time frame (e.g. walk 10000 steps each day)", // TODO fix
  width: 60,
  editable: true,
  cellRenderer: MetricRenderer,
  cellStyle: centerCell,
}

// Reactive Habit
export const TRIGGER_COL: (ColDef) = {
  field: HabitLabel.Trigger.toLowerCase(),
  headerName: HabitLabel.Trigger,
  headerTooltip: "What triggers the bad habit? (e.g. When I hit a wall on a task, I go on YouTube)",
  filter: 'agTextColumnFilter',
  width: 240,
  pinned: 'left'
};
export const REACTIVE_METRIC_COL: ColDef = {
  field: HabitLabel.Metric.toLowerCase(),
  headerName: "Test",
  headerTooltip: 'Positive or negative feedback based on a negative trigger (e.g. watching YouTube when you feel stressed)',
  cellRenderer: MetricRenderer,
  cellStyle: centerCell,
  width: 60
}


// Progress
export const PROGRESS_TODAY_COL: (ColDef) = {
  field: "today",
  headerName: "Today",
  cellRenderer: (params: any) => {
    return `<div class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-indeterminate ag-disabled" style="position: relative; top: -1px"><input type='checkbox' ${params.value ? 'checked' : ''} class="ag-input-field-input ag-checkbox-input" disabled /></div>`;
  },
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_1_DAY_AGO_COL: (ColDef) = {
  field: "1-day-ago",
  headerName: "1 day ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_2_DAYS_AGO_COL: (ColDef) = {
  field: "2-days-ago",
  headerName: "2 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_3_DAY_AGO_COL: (ColDef) = {
  field: "3-days-ago",
  headerName: "3 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_4_DAY_AGO_COL: (ColDef) = {
  field: "4-days-ago",
  headerName: "4 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_5_DAY_AGO_COL: (ColDef) = {
  field: "5-days-ago",
  headerName: "5 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_6_DAY_AGO_COL: (ColDef) = {
  field: "6-days-ago",
  headerName: "6 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const PROGRESS_7_DAY_AGO_COL: (ColDef) = {
  field: "7-days-ago",
  headerName: "7 days ago",
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  width: 60
};
export const OCCURRENCES_COL: (ColDef) = {
  field: "occurrences",
  headerName: "🗓️Last Occurrences",
  width: 500,
  cellRenderer: OccurrenceChipRenderer,
  valueFormatter: () => "",
};
export const DATE_COL: ColDef = {
  field: 'date',
  headerName: 'Date',
  filter: 'agDateColumnFilter',
  valueFormatter: params => params.value,
  editable: true,
};
export const VALUE_COL: ColDef = {
  field: 'value',
  headerName: 'Value',
  filter: 'agNumberColumnFilter',
  valueFormatter: params => params.value,
  editable: true,
};
