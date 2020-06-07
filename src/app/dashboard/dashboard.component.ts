import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AppModule } from '../app.module';
import { CalendarService, Appointment } from '../calendar.service';
import * as moment from 'moment';
import { SafeUrl } from '@angular/platform-browser';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private calendar: CalendarService) { }

  countdown: number;
  month: string;
  dayOfWeek: string;
  dayOfMonth: number;
  time: string;

  appointments: Appointment[];
  next: Appointment;
  loading: boolean = true;

  profileUrl: SafeUrl;

  ngOnInit(): void {
    this.updateTime();
    timer(1000, 1000).subscribe(() => this.updateTime());
    timer(60000, 60000).subscribe(() => this.refresh());
    this.calendar.getPhoto().subscribe((url) => this.profileUrl = url);
    this.refresh();
  }

  refresh() {
    this.loading = true;

    this.calendar.getAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      if (this.appointments.length > 0) {
        this.next = this.appointments.find((apt) => moment(apt.time) > moment());
      }
      this.loading = false;
    });
  }

  updateTime() {
    let date = new Date();
    this.month = months[date.getMonth()];
    this.dayOfWeek = daysOfWeek[date.getDay()];
    this.dayOfMonth = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let postfix = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12;
    hour = hour == 0 ? 12 : hour;
    let minuteString = minute.toString().length == 1 ? '0' + minute.toString() : minute.toString();

    this.time = hour.toString() + ':' + minuteString + ' ' + postfix;

    if (this.next) {
      this.countdown = Math.floor(moment.utc(this.next.time).diff(moment(), 'seconds'));
    }
  }

}
