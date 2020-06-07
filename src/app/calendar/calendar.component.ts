import { Component, OnInit } from '@angular/core';
import { CalendarService, Appointment } from '../calendar.service';
import * as moment from 'moment';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  appointments: Appointment[];
  currentDate: string;
  profileUrl: SafeUrl;
  loading: boolean = true;

  constructor(private service: CalendarService) { }

  ngOnInit(): void {
    this.currentDate = moment().format('MMMM Do, YYYY');
    this.service.getAppointments().subscribe((app) => 
    {
      this.appointments = app;
      this.loading = false;
    });
    this.service.getPhoto().subscribe((url) => this.profileUrl = url);
  }

}
