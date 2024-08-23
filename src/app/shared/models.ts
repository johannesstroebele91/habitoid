export interface AuthLoginUser {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date) {
  }


  get token(): null | string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) return null
    return this._token
  }
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface UserWithHabits {
  id: string;
  name: string;
  experience?: number;
  habits: Habit[]
}

export interface Habit {
  solution: string;
  problem?: string;
  reason?: string;
  measurement: Measurement;
  progressToday: string;
  progressLast7Days: string;
  progressForWeek: string;
  progressForMonth: string;
  // TODO check later if still needed
  active?: boolean;
  editing?: boolean;
  occurrences?: Occurrence[];
}

export interface Measurement {
  type: MeasurementType;
  repeat?: MeasurementRepetition,
  goal?: MeasurementGoal
}

export interface MeasurementRepetition {
  amount: number,
  unit: string,
  weekday: number
}

export interface MeasurementGoal {
  amount: number,
  unit: string
}

export enum TimeUnit {
  day = "day",
  week = "week",
  month = "month",
  year = "year"
}

enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum MeasurementType {
  irregularPosNegFeedback = "Irregular PosNeg Feedback",
  scheduledRepetitionGoal = "Scheduled Repetition Goal",
  scheduledCompletionGoal = "Scheduled Completion Goal"
}

export interface Occurrence {
  date: Date;
  value: number;
}
