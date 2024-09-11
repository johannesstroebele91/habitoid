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
  problem: string;
  solution: string;
  metric?: Metric;
  occurrences?: Occurrence[];
  // TODO check later if still needed
  active?: boolean;
  editing?: boolean;
}

export enum HabitType {
  ProactiveCheckbox = "ProactiveCheckbox",
  ProactiveNumeric = "ProactiveNumeric",
  Reactive = "Reactive"
}

export interface Metric {
  target: number,
  unit: string, // e.g. step(s), liter(s), time(s) ...
  frequency: Frequency, // e.g. day, week, ...
  weekday: Weekday[]
}

export interface Occurrence {
  date: Date;
  value: number;
}

export enum HabitLabel {
  Solution = "Solution",
  Problem = "Problem",
  Trigger = "Trigger",
  Metric = "Metric",
  Target = "Target"
}

export enum Frequency {
  day = "day",
  week = "week",
  month = "month",
  year = "year"
}


export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

