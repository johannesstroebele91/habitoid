import {Routes} from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";
import {LoginComponent} from "./components/login-register/login.component";
import {HomeComponent} from "./components/home.component";
import {RegistrationComponent} from "./components/login-register/registration.component";

export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegistrationComponent},
  {path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/'},
];
