import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./services/auth-interceptor.service";
import {provideNativeDateAdapter} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNativeDateAdapter(), provideAnimationsAsync(), provideHttpClient(withInterceptors([authInterceptor]))]
};
