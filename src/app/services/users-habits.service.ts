import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Habit, MeasurementType, UserWithHabits} from "../shared/models";
import {Observable} from "rxjs";

interface ResponseData {
  [key: string]: UserWithHabits;
}

const DOMAIN =
  'https://habitoid-987-default-rtdb.europe-west1.firebasedatabase.app/';
const USERS_WITH_HABITS_PATH = '/usersWithHabits';

@Injectable({
  providedIn: 'root', // This makes AuthService available throughout the application
})
export class UsersHabitsService {
  authService = inject(AuthService);
  http = inject(HttpClient);

  createUserWithDefaultHabits(id: string, name: string): Observable<{ name: string }> {
    const habits: Habit[] = [
      {
        solution: 'Example for a goal that you need to reach: e.g. 5000 steps per day',
        measurement: {
          type: MeasurementType.scheduledCompletionGoal
        },
        progressToday: '',
        progressLast7Days: '',
        progressForWeek: '',
        progressForMonth: ''
      },
      {
        solution: 'Example for a habit that you need to repeat: e.g. 3 times a day brush teeth',
        measurement: {
          type: MeasurementType.scheduledRepetitionGoal
        },
        progressToday: '',
        progressLast7Days: '',
        progressForWeek: '',
        progressForMonth: ''
      },
      {
        solution: 'If I feel that I spend too long on a task, I take a walk\'',
        problem: 'I spent to much time on a task, because I make everything',
        measurement: {
          type: MeasurementType.irregularPosNegFeedback
        },
        progressToday: '',
        progressLast7Days: '',
        progressForWeek: '',
        progressForMonth: ''
      },
    ];

    const userWithHabits: UserWithHabits = {
      id: id,
      name: name,
      habits: habits,
    }

    return this.http.put<{
      name: string;
    }>(`${DOMAIN}${USERS_WITH_HABITS_PATH}/${id}.json`, userWithHabits);
  }

  getUser(id: string): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${DOMAIN}${USERS_WITH_HABITS_PATH}/${id}.json`)
  }


  updateUser(userWithHabits: UserWithHabits): Observable<any> {
    return this.http.put(`${DOMAIN}${USERS_WITH_HABITS_PATH}/${userWithHabits.id}.json`, userWithHabits);
  }
}
