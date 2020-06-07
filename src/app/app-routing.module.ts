import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  { path: '', pathMatch:'full', component: DashboardComponent, canActivate: [MsalGuard] },
  { path: 'calendar', pathMatch:'full', component: CalendarComponent, canActivate: [MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
