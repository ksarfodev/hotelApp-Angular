import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedRoom } from '../interfaces/selected-room';

@Injectable({
  providedIn: 'root'
})

export class BookingService {

  constructor() { }

  private roomSource = new BehaviorSubject<SelectedRoom>({
   roomtypeid:-1,
   firstname:"",
   lastname:"",
   startdate:"",
   enddate:""
  });

  selectedRoom= this.roomSource.asObservable();

}
