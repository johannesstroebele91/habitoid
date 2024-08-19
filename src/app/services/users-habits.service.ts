import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Habit, UserWithHabits} from "../shared/models";
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
      {solution: 'Add your example habit above', active: false},
      {solution: 'Click on the checkbox to mark a habit as complete', active: false},
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
