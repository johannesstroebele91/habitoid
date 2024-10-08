import {Habit, HabitLabel, Occurrence} from "./models";
import {ColDef} from "ag-grid-community";
import {ActionsRenderer} from "../components/renderer/actions-renderer.component";
import {ReactiveMetricRenderer} from "../components/renderer/metric-renderer.component";
import {DeleteRenderer} from "../components/renderer/delete-renderer.component";
import {ProgressRenderer} from "../components/renderer/progress-renderer.component";
import {calcPosNegSumRelOccurrences} from "./utils";

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
export const PROBLEM_COL: (ColDef) = {
  field: HabitLabel.Problem.toLowerCase(),
  headerName: HabitLabel.Problem,
  headerTooltip: "What problematic behavior should be fixed?",
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
export const TARGET_COL: (ColDef) = {
  field: HabitLabel.Target.toLowerCase(),
  headerName: HabitLabel.Target,
  headerTooltip: "Which target should be reached",
  filter: 'agTextColumnFilter',
  valueGetter: (params: any) => {
    const habit = params.data as Habit;
    const target = habit.metric?.target
    return `${target} ${habit.metric?.unit}${target === 1 ? '' : 's'}`;
  },
  width: 90,
}
export const PROACTIVE_CHECKBOX_METRIC_COL: ColDef = {
  field: HabitLabel.Metric.toLowerCase(),
  headerName: "Metric",
  headerTooltip: 'How to measure the progress',
  cellRenderer: 'agCheckboxCellRenderer',
  cellEditor: 'agCheckboxCellEditor',
  cellStyle: centerCell,
  valueFormatter: () => '', // TODO fix later, what to do with real value
  width: 60,
}
export const PROACTIVE_NUMERIC_METRIC_COL: ColDef = {
  field: HabitLabel.Metric.toLowerCase(),
  headerName: "Metric",
  headerTooltip: 'How to measure the progress',
  cellEditor: "agNumberCellEditor",
  editable: true,
  cellRenderer: () => '<span style="color: grey;">Insert progress</span>',
  valueParser: () => '', // TODO fix later, what to do with real value
  width: 110,
}
export const REACTIVE_METRIC_COL: ColDef = {
  field: HabitLabel.Metric.toLowerCase(),
  headerName: "Metric",
  headerTooltip: 'How to measure the progress',
  cellRenderer: ReactiveMetricRenderer,
  cellStyle: centerCell,
  valueFormatter: () => '', // TODO fix later, what to do with real value
  width: 60,
}
export const TRIGGER_COL: (ColDef) = {
  field: HabitLabel.Trigger.toLowerCase(),
  headerName: HabitLabel.Trigger,
  headerTooltip: "What triggers the habit? (e.g. When I hit a wall on a task, I go on YouTube)",
  filter: 'agTextColumnFilter',
  width: 240,
  pinned: 'left'
};
export const DATE_COL: ColDef = {
  field: 'date',
  headerName: 'Date',
  filter: 'agDateColumnFilter',
  valueFormatter: (params: any) => {
    const occurrence = params.data as Occurrence;
    return occurrence.date.toDateString()
  },
  editable: true,
};
export const VALUE_COL: ColDef = {
  field: 'value',
  headerName: 'Value',
  filter: 'agNumberColumnFilter',
  valueFormatter: (params: any) => {
    const occurrence = params.data as Occurrence;
    return occurrence.value.toString()
  },
  editable: true,
};
export const DELETE_COL: (ColDef) =
  {
    field: "delete",
    width: 95,
    headerName: "Delete",
    cellRenderer: DeleteRenderer,
    headerTooltip: "Enables to delete a occurrence",
  };

const defaultProgressFields = {
  cellRenderer: ProgressRenderer,
  cellStyle: centerCell,
  tooltipValueGetter: (params: any) => {
    if (params.data.occurrences && params.colDef?.field) {
      const {
        negativeSumRelOccurrences, positiveSumRelOccurrences
      } = calcPosNegSumRelOccurrences(params.data.occurrences, params.colDef.field);
      if (negativeSumRelOccurrences < 0 && positiveSumRelOccurrences > 0) {
        return `${negativeSumRelOccurrences} / ${positiveSumRelOccurrences}`
      } else if (negativeSumRelOccurrences < 0) {
        return negativeSumRelOccurrences
      } else if (positiveSumRelOccurrences > 0) {
        return positiveSumRelOccurrences
      } else {
        return 'none'
      }
    } else {
      return 'none'
    }
  },
  sortable: false,
  width: 60
}

// Progress
export const PROGRESS_TODAY_COL: (ColDef) = {
  field: "today",
  headerName: "Today",
  ...defaultProgressFields
};
export const PROGRESS_1_DAY_AGO_COL: (ColDef) = {
  field: "1-day-ago",
  headerName: "1 day ago",
  ...defaultProgressFields
};
export const PROGRESS_2_DAYS_AGO_COL: (ColDef) = {
  field: "2-days-ago",
  headerName: "2 days ago",
  ...defaultProgressFields
};
export const PROGRESS_3_DAY_AGO_COL: (ColDef) = {
  field: "3-days-ago",
  headerName: "3 days ago",
  ...defaultProgressFields
};
export const PROGRESS_4_DAY_AGO_COL: (ColDef) = {
  field: "4-days-ago",
  headerName: "4 days ago",
  ...defaultProgressFields
};
export const PROGRESS_5_DAY_AGO_COL: (ColDef) = {
  field: "5-days-ago",
  headerName: "5 days ago",
  ...defaultProgressFields
};
export const PROGRESS_6_DAY_AGO_COL: (ColDef) = {
  field: "6-days-ago",
  headerName: "6 days ago",
  ...defaultProgressFields
};
export const PROGRESS_7_DAY_AGO_COL: (ColDef) = {
  field: "7-days-ago",
  headerName: "7 days ago",
  ...defaultProgressFields
};
export const PROGRESS_WEEK_COL: (ColDef) = {
  field: "week",
  headerName: "Week",
  ...defaultProgressFields
};
export const PROGRESS_MONTH_COL: (ColDef) = {
  field: "month",
  headerName: "Month",
  ...defaultProgressFields
};
export const PROGRESS_FOURTH_QUARTER_COL: (ColDef) = {
  field: "4-quarter",
  headerName: "4. quarter",
  ...defaultProgressFields
};
export const PROGRESS_THIRD_QUARTER_COL: (ColDef) = {
  field: "3-quarter",
  headerName: "3. quarter",
  ...defaultProgressFields
};
export const PROGRESS_SECOND_QUARTER_COL: (ColDef) = {
  field: "2-quarter",
  headerName: "2. quarter",
  ...defaultProgressFields
};
export const PROGRESS_FIRST_QUARTER_COL: (ColDef) = {
  field: "1-quarter",
  headerName: "1. quarter",
  ...defaultProgressFields
};
export const PROGRESS_YEAR_COL: (ColDef) = {
  field: "year",
  headerName: "Year",
  ...defaultProgressFields
};
