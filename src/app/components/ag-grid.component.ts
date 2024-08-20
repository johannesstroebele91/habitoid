import {Component} from "@angular/core";
import {AgGridAngular} from 'ag-grid-angular';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CellEditingStoppedEvent, GridApi, ICellRendererParams} from 'ag-grid-community';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {OccurrenceChipRenderer} from "./occurence-renderer.component";
import {ActionsRenderer} from "./actions-renderer.component";
import {HabitType, UserWithHabits} from "../shared/models";
import {RouterLink} from "@angular/router";
import {MetricRenderer} from "./metric-renderer.component";

const centerCell = {
  display: "flex",
  justifyContent: "center",
};

const testData: UserWithHabits[] = [
  {
    id: '1',
    name: 'John Doe',
    experience: 100,
    habits: [
      {
        solution: 'Exercise',
        challenge: 'Lack of time',
        type: HabitType.event,
        consequence: 'Decreased stamina',
        active: true,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-02'), value: 1},
        ]
      },
      {
        solution: 'Reading',
        challenge: 'Distractions',
        consequence: 'Slower learning',
        type: HabitType.event,
        active: false,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-01'), value: -1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        solution: 'Meditation',
        challenge: 'Stress',
        consequence: 'Anxiety',
        type: HabitType.event,
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
      {
        solution: 'Yoga',
        challenge: 'Inconsistent schedule',
        consequence: 'Back pain',
        active: true,
        type: HabitType.event,
        editing: false,
        occurrences: [
          {date: new Date('2024-08-01'), value: 1},
          {date: new Date('2024-08-03'), value: 1},
        ]
      },
      {
        solution: 'Cooking',
        challenge: 'Lack of ingredients',
        consequence: 'Unhealthy eating',
        type: HabitType.event,
        active: false,
        editing: true,
        occurrences: [
          {date: new Date('2024-08-02'), value: -1},
        ]
      }
    ]
  }
];


@Component({
  selector: 'app-grid-component',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    AgGridAngular,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    NgIf,
    OccurrenceChipRenderer,
    MatInput,
    RouterLink,
  ],
  template: `
    <mat-card appearance="outlined" style="margin: 1%">
      <mat-card-content>
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
          <button mat-fab extended aria-label="Add habit" color="primary"
                  (click)="addHabit()" style="height: 40px">
            <mat-icon>add</mat-icon>
            Add Habit
          </button>


          <mat-form-field subscriptSizing="dynamic">
            <mat-label>Quick Filter</mat-label>
            <input matInput type="text" [(ngModel)]="quickFilterValue" id="filter-text-box"
                   (input)="onQuickFilterSearch()">
            <button *ngIf="quickFilterValue" matSuffix mat-icon-button aria-label="Clear" (click)="quickFilterValue=''">
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
        </div>
        <div>
          <h1>Header Tooltip nachher rein für add und edit Habit (headerTooltip)</h1>

          <h2>Short summary</h2>
          <p>
            <strong>Event-Based Habits:</strong>
            Focus on specific triggers or contexts that initiate the behavior. These are often situational and may be
            influenced by emotional states or motivations, but are primarily defined by an event or context.
          </p>

          <p>
            <strong>Time-Based Habits:</strong>
            Emphasize temporal planning and regularity. These habits follow a fixed schedule or interval and are less
            dependent on external events or emotional states.
          </p>

          <p>
            <strong>Goal-Oriented Habits:</strong>
            Focus on achieving long-term goals and systematically pursuing these goals. They are often driven by an
            overarching goal, not necessarily by temporal or situational triggers.
          </p>

          <h2>Long Explanation</h2>
          <h3 style="font-weight: bolder">Event-Based Habit / Context-Based Habit / State-Based Habit / Motivational
            Habit:</h3>
          <p>A habit that is triggered by specific events, contextual conditions, emotional or physical states, or by
            motivations and rewards. This category includes:</p>
          <ul>
            <li><strong>Event-Based:</strong> Routines performed after specific events (e.g., checking if all lights are
              off when leaving the house).
            </li>
            <li><strong>Context-Based:</strong> Habits that occur in particular contexts or situations (e.g., taking
              notes after a meeting).
            </li>
            <li><strong>State-Based:</strong> Behaviors dependent on physical or emotional states (e.g., doing a short
              meditation when stressed).
            </li>
            <li><strong>Motivational:</strong> Habits reinforced by rewards or motivation (e.g., treating yourself to a
              small gift after reaching a weekly goal).
            </li>
          </ul>
          <p>Measurement</p>
          <ul>
            <li><strong>Track Stress Events</strong>: Record how often you feel stressed (e.g., 3 times a day).</li>
            <li><strong>Measure Response Rate</strong>: Track how often you meditated in response to stress (e.g., 2 out
              of 3 times).
            </li>
            <li><strong>Consistency Feedback</strong>: Provide feedback on the consistency of the response, with
              positive reinforcement for maintaining the habit.
            </li>
          </ul>

          <h3 style="font-weight: bolder">Time-Based Habit / Regular Habit:</h3>
          <p>A habit performed at specific times or in regular intervals. This type includes:</p>
          <ul>
            <li><strong>Time-Based:</strong> Habits executed at predefined times (e.g., going for a jog every day at 7
              AM and 6 PM).
            </li>
            <li><strong>Regular:</strong> Behaviors carried out according to a fixed schedule or interval, independent
              of specific events or contexts (e.g., taking a short break every 2 hours).
            </li>
          </ul>
          <p>Measurement</p>
          <ul>
            <li><strong>Track Scheduled Activities</strong>: Record how many times the jog was scheduled (e.g., 14 times
              a week).
            </li>
            <li><strong>Adherence Measurement</strong>: Track how often you adhered to the schedule (e.g., 12 out of 14
              times).
            </li>
            <li><strong>Time Adherence</strong>: Track how closely you adhered to the scheduled time (e.g., within 15
              minutes).
            </li>
          </ul>

          <h3 style="font-weight: bolder">Goal-Oriented Habit:</h3>
          <p>A habit focused on achieving a long-term goal and not necessarily influenced by specific events, contexts,
            or motivations. This type includes:</p>
          <ul>
            <li><strong>Goal-Directed:</strong> Routines aimed at reaching a specific goal (e.g., walking 10,000 steps
              daily or learning 5 new vocabulary words weekly).
            </li>
          </ul>
          <p>Measurement</p>
          <ul>
            <li><strong>Track Daily Progress</strong>: Record daily steps taken against the 10,000-step goal.</li>
            <li><strong>Weekly/Monthly Progress</strong>: Measure progress towards a cumulative goal (e.g., 70,000 steps
              a week).
            </li>
            <li><strong>Milestone Tracking</strong>: Track milestones (e.g., reaching a total of 300,000 steps in a
              month).
            </li>
            <li><strong>Feedback and Reinforcement</strong>: Provide ongoing feedback on progress and celebrate
              milestones to reinforce motivation.
            </li>
          </ul>
        </div>

        <h1>First Brainstorming for Table</h1>
        <h1>Test</h1>
        <p>Solution >Brush teeth / target: limited 3 per day / user input >( ) / Today: 2/3 (from red 0/3 to green in
          3/3) / Last 7 days (-1,-2,...): 1/3, 2/3, 3/4, 3,3, ... / Weekly Goal reached: 5/7 / Monthly Goal reached
          20/30 </p>
        <p>Solution >Avoid perfectionism / target: unlimited / user input >(+) (-) -> / Today: +5/-13 / Last 7 days
          (-1,-2,...): +5/-13, +3/-9, ... / Weekly Goal progress: 25/-31 / Monthly Goal progress: 65/-132 </p>

        <h2>Second Brainstorming for Table</h2>
        <table>
          <thead>
          <tr>
            <th>Problem</th>
            <th>Habit Type</th>
            <th>Measurement Type</th>
            <th>Measurement Description</th>
            <th>User Input</th>
            <th>Today</th>
            <th>Last 7 Days</th>
            <th>Weekly Goal Progress</th>
            <th>Monthly Goal Progress</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>I feel stressed</td>
            <td>Event-Based Habit</td>
            <td>Positive/Negative</td>
            <td>Meditate when stressed</td>
            <td>(+) (-)</td>
            <td class="success">+2/-0</td>
            <td class="success">+10/-5, +7/-3</td>
            <td class="success">25/30 (Success Rate)</td>
            <td class="success">70/90 (Success Rate)</td>
          </tr>
          <tr>
            <td>I want to stay hydrated</td>
            <td>Goal-Oriented Habit</td>
            <td>Number Input</td>
            <td>Drink water 5 times a day</td>
            <td>( )</td>
            <td class="success">4/5</td>
            <td class="success">24/35, 25/30</td>
            <td class="success">30/35 (Complete)</td>
            <td class="success">120/150 (Complete)</td>
          </tr>
          <tr>
            <td>I want to avoid perfectionism</td>
            <td>Event-Based Habit</td>
            <td>Positive/Negative</td>
            <td>Record instances of perfectionism</td>
            <td>(+) (-)</td>
            <td class="success">+3/-1</td>
            <td class="failure">+15/-7, +10/-5</td>
            <td class="success">30/40 (Progress)</td>
            <td class="success">80/100 (Progress)</td>
          </tr>
          <tr>
            <td>I need regular breaks</td>
            <td>Time-Based Habit</td>
            <td>Checkbox</td>
            <td>Take breaks every 2 hours</td>
            <td>( )</td>
            <td class="success">6/6</td>
            <td class="success">40/42, 38/42</td>
            <td class="success">50/50 (Complete)</td>
            <td class="success">200/210 (Complete)</td>
          </tr>
          <tr>
            <td>I want to achieve a fitness goal</td>
            <td>Goal-Oriented Habit</td>
            <td>Number Input</td>
            <td>Exercise for 30 minutes daily</td>
            <td>( )</td>
            <td class="success">30/30</td>
            <td class="success">150/210, 200/210</td>
            <td class="success">210/210 (Complete)</td>
            <td class="success">900/900 (Complete)</td>
          </tr>
          <tr>
            <td>I want to improve my sleep</td>
            <td>Time-Based Habit</td>
            <td>Checkbox</td>
            <td>Go to bed by 10 PM</td>
            <td>( )</td>
            <td class="success">6/7</td>
            <td class="success">40/42, 35/42</td>
            <td class="success">45/50 (Complete)</td>
            <td class="success">160/210 (Complete)</td>
          </tr>
          <tr>
            <td>I want to learn a new skill</td>
            <td>Goal-Oriented Habit</td>
            <td>Number Input</td>
            <td>Practice skill for 1 hour daily</td>
            <td>( )</td>
            <td class="success">60/60</td>
            <td class="success">400/420, 380/420</td>
            <td class="success">420/420 (Complete)</td>
            <td class="success">1800/1800 (Complete)</td>
          </tr>
          <tr>
            <td>I want to achieve 70,000 steps</td>
            <td>Goal-Oriented Habit</td>
            <td>Number Input</td>
            <td>Track steps for 70,000 per week</td>
            <td>( )</td>
            <td class="success">10,000/10,000</td>
            <td class="success">70,000/70,000</td>
            <td class="success">70,000/70,000 (Complete)</td>
            <td class="success">280,000/280,000 (Complete)</td>
          </tr>
          </tbody>
        </table>


        <ag-grid-angular
          [rowData]="rowData"
          [columnDefs]="colDefs"
          class="ag-theme-balham"
          (gridReady)="onGridReady($event)"
          [rowDragManaged]="true"
          (cellEditingStopped)="onCellEditingStopped($event)"
          style="height: 70vh"
        />
      </mat-card-content>
    </mat-card>
  `,
})
export class AgGridComponent {
  rowData: any[] = [];
  quickFilterValue = '';

  colDefs: any[] = [
    {
      field: "actions",
      width: 110,
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
      rowDrag: true,
      headerTooltip: "Rows not draggable when sorted",
    },
    {
      field: "solution",
      headerName: "🎯Solution",
      headerTooltip: "How to improve?",
      filter: 'agTextColumnFilter',
      width: 140
    },
    {
      field: "problem",
      headerName: "⚠️Problem",
      headerTooltip: "What am I doing wrong?",
      filter: 'agTextColumnFilter',
      width: 140
    },
    {
      field: "reason",
      headerName: "🔍Reason",
      headerTooltip: "Why is it important to fix?",
      filter: 'agTextColumnFilter',
      width: 140
    },
    {
      field: "metric",
      headerName: "🛠️Metric",
      headerTooltip: "How is it measured?",
      width: 120,
      cellEditor: "agNumberCellEditor",
      editable: true,
      valueSetter: "",
      cellRenderer: (params: ICellRendererParams) => {
        // If the cell value is empty, show the placeholder
        if (!params.value || params.value === '') {
          return '<span style="color: grey;">Insert progress</span>';
        }
        // Otherwise, display the actual cell value
        return params.value;
      }
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 80,
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
      field: "occurrences",
      hide: true,
      width: 500,
      headerName: "🗓️Occurrences",
      cellRenderer: OccurrenceChipRenderer,
    },
  ];
  private gridApi!: GridApi;

  constructor() {
    this.rowData = this.buildRowData(testData);
  }

  onQuickFilterSearch() {
    if (this.gridApi) {
      this.gridApi.setGridOption(
        "quickFilterText",
        this.quickFilterValue,
      );
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  buildRowData(users: UserWithHabits[]): any[] {
    return users.flatMap(user =>
      user.habits.map(habit => {
        const sortedOccurrences = habit.occurrences?.sort((a, b) => b.date.getTime() - a.date.getTime());
        const formattedOccurrences = sortedOccurrences?.map(occurrence => {
          const emoji = occurrence.value > 0 ? '👍' : '👎';
          const formattedDate = new Intl.DateTimeFormat('de').format(occurrence.date);
          return `${formattedDate} ${emoji}`;
        });

        return {
          solution: habit.solution,
          challenge: habit.challenge,
          consequence: habit.consequence,
          active: habit.active ? 'Yes' : 'No',
          occurrences: formattedOccurrences
        };
      })
    );
  }

  addHabit() {

  }

  onCellEditingStopped($event: CellEditingStoppedEvent) {
    // Handle the logic after the editing metrics col stops
    if ($event.colDef.field === "metric") {
      const newProgressValue = $event.newValue;

      // Get the current value of the 'progress' column in the same row
      const oldProgressValueOrUndefined = $event.data.progress
      const oldProgressValue = oldProgressValueOrUndefined === undefined ? 0 : Number(oldProgressValueOrUndefined);

      // Trigger a change in 'progress' field
      $event.node.setDataValue('progress', newProgressValue + oldProgressValue);
    }
  }
}
