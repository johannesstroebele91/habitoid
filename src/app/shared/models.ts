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
  type: HabitType,
  trigger?: string;
  reason?: string;
  solution?: string;
  metric?: Metric;
  occurrences?: Occurrence[];
  // TODO check later if still needed
  active?: boolean;
  editing?: boolean;
}

export enum HabitType {
  Proactive = "Proactive",
  Reactive = "Reactive"
}

export enum HabitLabel  {
  Solution = "Solution",
  Reason = "Reason",
  Trigger = "Trigger",
  Metric = "Metric"
}

export interface Metric {
  amount: number,
  unit: string,
  weekday: number
}

export interface Occurrence {
  date: Date;
  value: number;
}


/* TODO delete later if not needed
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
} */

