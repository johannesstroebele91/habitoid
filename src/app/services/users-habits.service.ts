import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Habit, MetricType, UserWithHabits} from "../shared/models";
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
  // TODO auth service reparieren
  authService = inject(AuthService);
  http = inject(HttpClient);

  createUserWithDefaultHabits(id: string, name: string): Observable<{ name: string }> {
    // TODO später löschen
    const habits: Habit[] = [
      {
        problem: 'Don\'t think that going later to the gym works.',
        reason: 'I mess up my WHOLE day if I don\'t do it in the morning!',
        solution: '1) Go to the gym the next day 2) Go now and write colleagues that I\'ll arrive later to work',
        measurement: {
          type: MetricType.Reaction
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
        problem: 'Don\'t spent too much time making everything perfect',
        reason: 'Causes me to overbook my tickets, lots of stress, and the customer doesn\'t actually need it',
        solution: '1) Take a nap with ebook 2) Take a walk (without my phone)',
        measurement: {
          type: MetricType.Reaction
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
        problem: 'Don\'t use phone/gaming, when I cannot solve my task',
        reason: 'Stresses me out even more, leads to a downward spirale',
        solution: '1) Take a nap with ebook 2) Take a walk (without my phone)',
        measurement: {
          type: MetricType.Reaction
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
      },
      {
        solution: 'Wash clothes each saturday',
        reason: 'Best to wash within 1kg wash machine limit.',
        measurement: {
          type: MetricType.Repetition
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
        solution: 'Put phone into letterbox in the morning until 5pm',
        reason: 'Cannot focus with phone in my room.',
        measurement: {
          type: MetricType.Repetition
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
      },
      {
        solution: 'Walk 10000 steps every day',
        reason: 'Want to loose weight',
        measurement: {
          type: MetricType.Goal
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
        solution: 'Drink 3 liters each day',
        reason: 'Staying hydrated improves overall health and energy',
        measurement: {
          type: MetricType.Goal
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
