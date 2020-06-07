import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

interface Interval {
  label: string;
  duration: number;
}

@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.scss']
})
export class TimeIntervalComponent implements OnInit {

  @Input()
  public duration: number;

  public intervals: Interval[];

  constructor() { }

  ngOnInit(): void {
    let arrays: Interval[] = [];

    let mom = moment.duration(this.duration, 'seconds');
    if (mom.days()) {
      arrays.push({ label: 'day', duration: mom.days() });
    }
    if (mom.hours()) {
      arrays.push({ label: 'hour', duration: mom.hours() });
    }
    if (mom.minutes()) {
      arrays.push({ label: 'minute', duration: mom.minutes() });
    }
    if (mom.seconds()) {
      arrays.push({ label: 'second', duration: mom.seconds() });
    }

    arrays = arrays.map((arr) => arr.duration > 1 ? { label: arr.label + 's', duration: arr.duration } : arr);
    this.intervals = arrays;
  }

}
