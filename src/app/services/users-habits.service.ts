import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Habit, HabitType, UserWithHabits} from "../shared/models";
import {Observable} from "rxjs";

interface ResponseData {
  [key: string]: UserWithHabits;
}

const DOMAIN =
  'https://habitoid-987-default-rtdb.europe-west1.firebasedatabase.app/';
const USERS_WITH_HABITS_PATH = '/usersWithHabits';

const today = new Date();
const generateDate = (daysAgo: number) => {
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date;
};

const HABITS_TEST_DATEN: Habit[] = [
  {
    trigger: 'Don\'t think that going later to the gym works.',
    problem: 'I mess up my WHOLE day if I don\'t do it in the morning!',
    solution: '1) Go to the gym the next day 2) Go now and write colleagues that I\'ll arrive later to work',
    type: HabitType.Reactive,
    active: true,
    editing: false,
    occurrences: [
      {date: generateDate(0), value: 1}, // today
      {date: generateDate(0), value: -1}, // today
      {date: generateDate(0), value: 1}, // today
      {date: generateDate(1), value: 1}, // 1 day ago
      {date: generateDate(2), value: -1}, // 2 days ago
      {date: generateDate(2), value: 1}, // 2 days ago
      {date: generateDate(2), value: 2}, // another occurrence on the same day
      {date: generateDate(3), value: -1},
      {date: generateDate(4), value: -1},
      {date: generateDate(5), value: 1},
      {date: generateDate(6), value: 1},
      {date: generateDate(7), value: 1}, // 7 days ago
      {date: generateDate(30), value: 1}, // 1 month ago
      {date: generateDate(90), value: -1}, // 1 quarter ago (3 months ago)
      {date: generateDate(90), value: -1}, // 1 quarter ago (3 months ago)
      {date: generateDate(90), value: 1}, // 1 quarter ago (3 months ago)
      {date: generateDate(180), value: 1}, // 2 quarters ago (6 months ago)
      {date: generateDate(270), value: 1}, // 3 quarters ago (9 months ago)
      {date: generateDate(365), value: 1}, // 1 year ago
    ],
  },
  {
    trigger: 'Don\'t spend too much time making everything perfect',
    problem: 'Causes me to overbook my tickets, lots of stress, and the customer doesn\'t actually need it',
    solution: '1) Take a nap with ebook 2) Take a walk (without my phone)',
    type: HabitType.Reactive,
    active: false,
    editing: true,
    occurrences: [
      {date: generateDate(0), value: -1},
      {date: generateDate(0), value: -1},
      {date: generateDate(0), value: 1},
      {date: generateDate(1), value: 1},
      {date: generateDate(1), value: 1},
      {date: generateDate(1), value: -1},
      {date: generateDate(3), value: 1},
      {date: generateDate(4), value: 1},
      {date: generateDate(60), value: 1},  // 2 months ago
      {date: generateDate(120), value: 1}, // 4 months ago
      {date: generateDate(120), value: -1}, // 4 months ago
      {date: generateDate(120), value: -1}, // 4 months ago
      {date: generateDate(240), value: 1}, // 8 months ago
      {date: generateDate(365), value: 1}, // 1 year ago
    ],
  },
  {
    trigger: 'Don\'t use phone/gaming, when I cannot solve my task',
    problem: 'Stresses me out even more, leads to a downward spiral',
    solution: '1) Take a nap with ebook 2) Take a walk (without my phone)',
    type: HabitType.Reactive,
    active: true,
    editing: false,
    occurrences: [
      {date: generateDate(0), value: 1},  // today
      {date: generateDate(0), value: 1},  // today
      {date: generateDate(0), value: 1},  // today
      {date: generateDate(1), value: -1},  // today
      {date: generateDate(2), value: -1},  // today
      {date: generateDate(2), value: 1},  // 1 day ago
      {date: generateDate(2), value: -1},  // 2 days ago
      {date: generateDate(4), value: 1},  // 2 days ago
      {date: generateDate(4), value: -1},  // 2 days ago
      {date: generateDate(90), value: 1},  // 1 quarter ago (3 months ago)
      {date: generateDate(270), value: -1}, // 3 quarters ago (9 months ago)
      {date: generateDate(270), value: 1}, // 3 quarters ago (9 months ago)
    ],
  },
  {
    solution: 'Wash clothes each Saturday',
    problem: 'Best to wash within 1kg wash machine limit.',
    type: HabitType.Proactive,
    active: true,
    editing: false,
    occurrences: [
      {date: generateDate(1), value: 1},
      {date: generateDate(2), value: 1},
      {date: generateDate(7), value: 1},   // 1 week ago
      {date: generateDate(180), value: 1}, // 6 months ago (2 quarters ago)
      {date: generateDate(180), value: 1}, // 6 months ago (2 quarters ago)
    ],
  },
  {
    solution: 'Put phone into letterbox in the morning until 5pm',
    problem: 'Cannot focus with phone in my room.',
    type: HabitType.Proactive,
    active: false,
    editing: true,
    occurrences: [
      {date: generateDate(0), value: 1},  // today
      {date: generateDate(30), value: 1}, // 1 month ago
    ],
  },
  {
    solution: 'Walk 10,000 steps every day',
    problem: 'Want to lose weight',
    type: HabitType.Proactive,
    active: true,
    editing: false,
    occurrences: [
      {date: generateDate(0), value: 10000},   // today
      {date: generateDate(1), value: 8000},   // 1 day ago
      {date: generateDate(2), value: 11000},   // 2 days ago
      {date: generateDate(3), value: 8000},   // 3 days ago
      {date: generateDate(3), value: 2000},   // 3 days ago
      {date: generateDate(4), value: 1},   // 4 days ago
      {date: generateDate(5), value: 5000},   // 5 days ago
      {date: generateDate(5), value: 1000},   // 5 days ago
      {date: generateDate(5), value: 6000},   // 5 days ago
      {date: generateDate(6), value: 8000},   // 6 days ago
      {date: generateDate(365), value: 5000}, // 1 year ago
    ],
  },
  {
    solution: 'Drink 3 liters of water each day',
    problem: 'Staying hydrated improves overall health and energy',
    type: HabitType.Proactive,
    active: true,
    editing: true,
    occurrences: [
      {date: generateDate(1), value: 250},   // 1 day ago
      {date: generateDate(1), value: 1500},   // 1 day ago
      {date: generateDate(3), value: 2000},   // 3 days ago
      {date: generateDate(3), value: 1500},   // 3 days ago
      {date: generateDate(5), value: 2000},   // 5 days ago
      {date: generateDate(30), value: 2500},  // 1 month ago
      {date: generateDate(180), value: 3500}, // 6 months ago (2 quarters ago)
    ],
  },
  {
    solution: 'Walk around the corner after meal',
    problem: 'Helps reduce stress and improve focus',
    type: HabitType.Proactive,
    active: true,
    editing: false,
    occurrences: [
      {date: generateDate(0), value: 1},   // today
      {date: generateDate(7), value: 1},   // 1 week ago
      {date: generateDate(30), value: 1},  // 1 month ago
      {date: generateDate(30), value: 1},  // 1 month ago
      {date: generateDate(90), value: 1},  // 3 months ago (1 quarter ago)
      {date: generateDate(180), value: 1}, // 6 months ago (2 quarters ago)
      {date: generateDate(180), value: 1}, // 6 months ago (2 quarters ago)
      {date: generateDate(180), value: 1}, // 6 months ago (2 quarters ago)
      {date: generateDate(180), value: 1}, // 6 months ago (2 quarters ago)
      {date: generateDate(365), value: 1}, // 1 year ago
    ],
  },
  {
    solution: 'Brush teeth after each meal',
    problem: 'Helps improve hygiene',
    type: HabitType.Proactive,
    active: true,
    editing: false,
    occurrences: [
      {date: generateDate(1), value: 1},   // 3 days ago
      {date: generateDate(1), value: 1},   // 3 days ago
      {date: generateDate(2), value: 1},   // 3 days ago
      {date: generateDate(3), value: 1},   // 3 days ago
      {date: generateDate(3), value: 1},   // 3 days ago
      {date: generateDate(15), value: 1},  // 2 months ago
      {date: generateDate(15), value: 1},  // 2 months ago
      {date: generateDate(15), value: 1},  // 2 months ago
      {date: generateDate(60), value: 1},  // 2 months ago
      {date: generateDate(60), value: 1},  // 2 months ago
      {date: generateDate(120), value: 1}, // 4 months ago (2 quarters ago)
      {date: generateDate(120), value: 1}, // 4 months ago (2 quarters ago)
      {date: generateDate(240), value: 1}, // 8 months ago (3 quarters ago)
    ],
  },
];

@Injectable({
  providedIn: 'root', // This makes AuthService available throughout the application
})
export class UsersHabitsService {
  // TODO auth service reparieren
  authService = inject(AuthService);
  http = inject(HttpClient);

  createUserWithDefaultHabits(id: string, name: string): Observable<{ name: string }> {
    // TODO später löschen
    const userWithHabits: UserWithHabits = {
      id: id,
      name: name,
      habits: HABITS_TEST_DATEN,
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
