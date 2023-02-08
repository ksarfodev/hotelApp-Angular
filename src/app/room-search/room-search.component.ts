import { Component, OnInit } from '@angular/core';
import { PreferredDates } from '../interfaces/preferred-dates';
import { CalendarService } from '../services/calendar.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss'],
})
export class RoomSearchComponent implements OnInit {
  preferredDates: PreferredDates;

  constructor(
    public calendarService: CalendarService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.preferredDates = { startdate: new Date(), enddate: new Date() };
  }

  ngOnInit(): void {
    this.calendarService.preferredDates.subscribe(
      (preferredDates) => (this.preferredDates = preferredDates)
    );
  }

  errorMessage?: string;
  isError?: boolean;

  getRooms() {
    //show loading animation
    this.calendarService.getDates().subscribe();

    this.apiService.getAvailableRooms(this.preferredDates).subscribe(
      (response) => {
        console.log(response);
        this.apiService.listOfRooms = response;

        if (this.apiService.listOfRooms) {
          this.errorMessage = '';
          this.isError = false;
          //remove loading animation
          this.router.navigateByUrl('room-booking');
        }
      },
      (error) => {
        console.error('error........');
        this.errorMessage = error;
        this.isError = true;
      }
    );
  }
}