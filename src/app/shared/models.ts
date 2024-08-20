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
  challenge?: string;
  consequence?: string;
  active: boolean;
  editing?: boolean;
  occurrences?: Occurrence[];
  type: HabitType
}

export enum HabitType {
  event = "event",
  time = "time",
  goal = "goal"
}

interface Occurrence {
  date: Date;
  value: 1 | -1;
}
