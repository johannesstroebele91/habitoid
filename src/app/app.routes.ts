import {Routes} from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";
import {LoginComponent} from "./components/login.component";
import {HomeComponent} from "./components/home.component";
import {RegistrationComponent} from "./components/registration.component";
import {AgGridComponent} from "./components/ag-grid.component";

export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'ag-grid', component: AgGridComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/'},
];
