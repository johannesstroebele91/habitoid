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
  goal: string;
  trigger?: string;
  reason?: string;
  measurement: Metric;
  progressToday: string;
  progressLast7Days: string;
  progressForWeek: string;
  progressForMonth: string;
  // TODO check later if still needed
  active?: boolean;
  editing?: boolean;
  occurrences?: Occurrence[];
}

export interface Metric {
  type: MetricType;
  repetition?: MetricRepetition,
  numeric?: MetricNumeric
}

export interface MetricRepetition {
  amount: number,
  unit: string,
  weekday: number
}

export interface MetricNumeric {
  totalAmount: number,
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

export enum MetricType {
  Repetition = "Repetition",
  Numeric = "Numeric",
  Reaction = "Reaction"
}

export interface Occurrence {
  date: Date;
  value: number;
}
