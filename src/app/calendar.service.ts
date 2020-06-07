import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

export interface Appointment {
  time: string;
  description: string;
  location: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private client: HttpClient, private sanitizer: DomSanitizer) { 
  }


  getCurrentTime() {

  }

  getPhoto() {
    return this.client.get('https://graph.microsoft.com/beta/me/photo/$value', {responseType: "blob"}).pipe(map((image: any) => {
      const url = window.URL || window.webkitURL;
      let blobUrl = this.sanitizer.bypassSecurityTrustUrl( url.createObjectURL(image) );
      return blobUrl;
    }));
  }


  getAppointments() {
    let today = moment().startOf('day');
    let tomorrow = moment().startOf('day').add('day', 1);

    return this.client.get("https://graph.microsoft.com/v1.0/me/calendar/events?$filter=start/dateTime lt '" + tomorrow.toISOString() + "' and start/dateTime ge '" + today.toISOString() + "'&$orderBy start/dateTime asc")
    .pipe(map((result:any) => result.value.map((dt) => {
      return {
        time: dt.start.dateTime,
        description: dt.subject,
        duration: moment.utc(dt.end.dateTime).diff(moment.utc(dt.start.dateTime)) / 1000,
        location: dt.location.displayName
      };
    })));

  }
}
