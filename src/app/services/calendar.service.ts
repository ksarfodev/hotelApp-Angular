import { Injectable } from '@angular/core';
import { PreferredDates } from '../interfaces/preferred-dates';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor() {}

  currentDate = new Date(Date.now());

  private dateSource = new BehaviorSubject<PreferredDates>({
    startdate: new Date(Date.now()),
    enddate: new Date(this.currentDate.setDate(this.currentDate.getDate() + 1)),
  });

  preferredDates = this.dateSource.asObservable();

  setDates(dateSource: PreferredDates) {
    this.dateSource.next(dateSource);
  }

  getDates() {
    this.dateSource.value.startdate = this.removeTime(
      this.dateSource.value.startdate
    );
    this.dateSource.value.enddate = this.removeTime(
      this.dateSource.value.enddate
    );

    console.log('Date ' + this.dateSource.value.startdate);
    return this.dateSource;
  }

  removeTime(date = new Date()) {
    return new Date(
      date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    );
  }
}
