import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { AvailableRooms } from '../interfaces/available-rooms';
import { HttpClient } from '@angular/common/http';
import { PreferredDates } from '../interfaces/preferred-dates';
import { CalendarService } from './calendar.service';
import { SelectedRoom } from '../interfaces/selected-room';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private calendarSevice: CalendarService
  ) {}

  //uncomment the following when testing locally
  // roomSearchFunctionUrl: string = 'https://localhost:7077/api/RoomSearch';
  // bookingsFunctionUrl: string = 'https://localhost:7077/api/Bookings';

  //live api, uncomment once released
  roomSearchFunctionUrl:string ="https://hotelappazurefunction20220928155452.azurewebsites.net/api/RoomSearch?code=RjqIpz8OCSKwFVBlU5m9fO0sk8aDxdX9-UOZ_5Kk-W2gAzFuUnnlCA==";
  bookingsFunctionUrl:string = "https://hotelappazurefunction20220928155452.azurewebsites.net/api/Bookings?code=aT-EowUWQBMpFsQiH18SDpfER21dHYC-NI3eKVgXdIExAzFuH9HlsQ==";

  private availableRoomsSrc = new BehaviorSubject<AvailableRooms>({
    id: 0,
    title: '',
    description: '',
    price: 0,
  });

  availableRooms = this.availableRoomsSrc.asObservable();

  listOfRooms?: AvailableRooms[];

  selectedRoom?: SelectedRoom;

  getAvailableRooms(
    preferredDates?: PreferredDates
  ): Observable<AvailableRooms[]> {
    //console.log('getRooms'+this.baseURL+'roomsearch')
    console.log('getRooms ' + this.roomSearchFunctionUrl);
    console.log('Api call made.');

    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    const body = JSON.stringify(preferredDates);

    return this.http
      .post<AvailableRooms[]>(this.roomSearchFunctionUrl, body, {
        headers: headers,
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  bookGuest(selectedRoom?: SelectedRoom): Observable<any> {
    console.log('bookguest' + this.bookingsFunctionUrl);
    console.log('Api call made.');

    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    const body = JSON.stringify(selectedRoom);

    return this.http
      .post(
        this.bookingsFunctionUrl,
        body,
        {
          headers: headers,
          responseType: 'text',
        }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }
}
