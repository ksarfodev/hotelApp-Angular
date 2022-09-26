import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { AvailableRooms } from '../interfaces/available-rooms';
import { HttpClient } from '@angular/common/http';
import { PreferredDates } from '../interfaces/preferred-dates';
import { CalendarService } from './calendar.service';
import { SelectedRoom } from '../interfaces/selected-room';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient, private calendarSevice: CalendarService) { }

 // baseURL: string = "https://localhost:7077/api/";
 baseURL:string = "https://hotelappapi.azure-api.net/v1/api/";

  //preferredDates?: PreferredDates;

  private availableRoomsSrc = new BehaviorSubject<AvailableRooms>({
    id: 0,
    title: "",
    description: "",
    price: 0
  });

  availableRooms = this.availableRoomsSrc.asObservable();
  
  listOfRooms?:AvailableRooms[] ;

  selectedRoom?:SelectedRoom;

  getAvailableRooms(preferredDates?: PreferredDates):Observable<AvailableRooms[]> {

    console.log('getRooms'+this.baseURL+'roomsearch')
    console.log("Api call made.");

    const headers = {'content-type':'application/json','Access-Control-Allow-Origin': '*'};
    const body = JSON.stringify(preferredDates);

    return this.http.post<AvailableRooms[]>(this.baseURL+ 'roomsearch',body,
    {
        'headers':headers
    })
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );

  
  }
    
  bookGuest(selectedRoom?: SelectedRoom):Observable<any> {

    console.log('bookguest' + this.baseURL+'bookings')
    console.log("Api call made.");

    const headers = {'content-type':'application/json','Access-Control-Allow-Origin': '*'};
    const body = JSON.stringify(selectedRoom);

    return this.http.post(this.baseURL+ 'bookings',body,
    {
        'headers':headers
    })
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );

  
  }
    

  }



