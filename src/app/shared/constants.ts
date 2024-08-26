import {MeasurementType, UserWithHabits} from "./models";
import {ColDef, ColGroupDef} from "ag-grid-community";
import {ActionsRenderer} from "../components/renderer/actions-renderer.component";
import {MetricRenderer} from "../components/renderer/metric-renderer.component";
import {OccurrenceChipRenderer} from "../components/renderer/occurence-renderer.component";

export const ERROR_MESSAGE = 'You must enter a valid value';

export const TESTDATA_USERS_WITH_HABIT: UserWithHabits[] = [
  {
    id: '1',
    name: 'John Doe',
    experience: 100,
    habits: [
      // Irregular PosNeg Feedback
      {
        solution: 'Practice deep breathing when anxious',
        problem: 'I feel anxious in social situations',
        reason: 'If I don\'t address my anxiety, social interactions become overwhelming.',
        measurement: {
          type: MeasurementType.irregularPosNegFeedback
        },
        progressToday: '+3/-1',
        progressLast7Days: '+15/-6, +10/-8',
        progressForWeek: '18/25 (Success Rate)',
        progressForMonth: '70/100 (Success Rate)',
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
        ]
      },
      {
        solution: 'If I feel that I spend too long on a task, I take a walk',
        problem: 'I spent to much time on a task, because I make everything',
        reason: 'Perfectionism causes delays and stress, impacting my productivity.',
        measurement: {
          type: MeasurementType.irregularPosNegFeedback
        },
        progressToday: '+2/-1',
        progressLast7Days: '+10/-4, +8/-5',
        progressForWeek: '20/30 (Progress)',
        progressForMonth: '60/90 (Progress)',
        active: false,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-01'), value: -1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        solution: 'Meditate or take deep breaths when stressed',
        problem: 'I feel stressed at work',
        reason: 'Chronic stress affects my work performance and overall well-being.',
        measurement: {
          type: MeasurementType.irregularPosNegFeedback
        },
        progressToday: '+4/-2',
        progressLast7Days: '+12/-6, +9/-4',
        progressForWeek: '22/30 (Success Rate)',
        progressForMonth: '80/100 (Success Rate)',
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    experience: 200,
    habits: [
      // Scheduled Repetition Goal
      {
        solution: 'Walk for 10 minutes each day',
        problem: 'I need to take a 10-minute walk every day',
        reason: 'Regular short walks improve my energy levels and focus.',
        measurement: {
          type: MeasurementType.scheduledRepetitionGoal
        },
        progressToday: '10/10',
        progressLast7Days: '70/70, 65/70',
        progressForWeek: '70/70 (Complete)',
        progressForMonth: '300/300 (Complete)',
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
        ]
      },
      {
        solution: 'Cook meals with available ingredients',
        problem: 'Lack of ingredients',
        reason: 'Cooking with available ingredients helps avoid unhealthy eating.',
        measurement: {
          type: MeasurementType.scheduledRepetitionGoal
        },
        progressToday: '0/1',
        progressLast7Days: '3/7',
        progressForWeek: '4/7 (Progress)',
        progressForMonth: '16/30 (Progress)',
        active: false,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-02'), value: -1},
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Alice Johnson',
    experience: 150,
    habits: [
      {
        solution: 'Complete a 30-minute workout every day',
        problem: 'Lack of physical exercise',
        reason: 'Regular exercise improves my overall health and fitness.',
        measurement: {
          type: MeasurementType.scheduledCompletionGoal
        },
        progressToday: '1/1',
        progressLast7Days: '7/7, 6/7',
        progressForWeek: '7/7 (Complete)',
        progressForMonth: '30/30 (Complete)',
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        solution: 'Read one chapter of a book each day',
        problem: 'Difficulty maintaining a reading habit',
        reason: 'Regular reading improves my knowledge and relaxation.',
        measurement: {
          type: MeasurementType.scheduledCompletionGoal
        },
        progressToday: '1/1',
        progressLast7Days: '5/7',
        progressForWeek: '5/7 (Progress)',
        progressForMonth: '20/30 (Progress)',
        active: true,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-02'), value: 1},
        ]
      }
    ]
  }
];

const centerCell = {
  display: "flex",
  justifyContent: "center",
};


export const DEFAULT_COL_DEFS: (ColDef | ColGroupDef)[] = [
  {
    field: "actions",
    width: 110,
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    rowDrag: true,
    headerTooltip: "Rows not draggable when sorted",
    pinned: 'left'
  },
  {
    field: "solution",
    headerName: "🎯Solution",
    headerTooltip: "How to improve?",
    filter: 'agTextColumnFilter',
    width: 240,
    pinned: 'left'
  },
  {
    field: "problem",
    headerName: "⚠️Problem",
    headerTooltip: "What am I doing wrong?",
    filter: 'agTextColumnFilter',
    width: 240,
    pinned: 'left'
  },
  {
    field: "reason",
    headerName: "🔍Reason",
    headerTooltip: "Why is it important to fix?",
    filter: 'agTextColumnFilter',
    width: 200
  },
  {
    headerName: "Measurement",
    children: [
      {
        field: "metric",
        headerName: "🛠️Metric",
        headerTooltip: "How is it measured?",
        width: 120,
        cellEditor: "agNumberCellEditor",
        editable: true,
        cellRenderer: () => '<span style="color: grey;">Insert progress</span>'
      },
      {
        field: "metric",
        headerName: "🛠️Metric",
        headerTooltip: "How is it measured?",
        cellRenderer: MetricRenderer,
        cellStyle: centerCell,
        width: 80
      },
      {
        field: "metric",
        headerName: "🛠️Metric",
        headerTooltip: "FIX!!!!?",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 80
      },
    ]
  },
  {
    headerName: "Progress",
    children: [
      {
        field: "progress",
        headerName: "Progress",
        width: 80,
      },
      {
        field: "monday",
        headerName: "Mon",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        field: "tuesday",
        headerName: "Tue",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        field: "wednesday",
        headerName: "Wed",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        field: "thursday",
        headerName: "Thu",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        field: "friday",
        headerName: "Fri",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        field: "saturday",
        headerName: "Sat",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        field: "sunday",
        headerName: "Sun",
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellStyle: centerCell,
        width: 50
      },
      {
        /* TODO evtl. später wieder rauslöschen*/
        field: "occurrences",
        width: 500,
        headerName: "🗓️Last Occurrences",
        cellRenderer: OccurrenceChipRenderer,
      },
    ]
  },
];
