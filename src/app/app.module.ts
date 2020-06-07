import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MsalModule, MsalService, MsalInterceptor } from '@azure/msal-angular'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TimeIntervalComponent } from './time-interval/time-interval.component';
import { LoaderComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { environment } from "../environments/environment";

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read', 'calendars.read', 'calendars.read.shared']],
  ['https://graph.microsoft.com/beta/me', ['user.read', 'calendars.read', 'calendars.read.shared']]
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DashboardComponent,
    SettingsComponent,
    TimeIntervalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: environment.clientId,
          redirectUri: "https://hs-calendar-viewer.netlify.com",
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // set to true for IE 11
        }
      },
      {
        popUp: isIE,   
        consentScopes: [
          "user.read",
          "openid",
          "profile",
          "calendars.read",
          "calendars.read.shared"
        ],
        unprotectedResources: ["https://www.microsoft.com/en-us/"],
        protectedResourceMap,
        extraQueryParameters: {}
      }
    ),
    HttpClientModule,
    ClarityModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
