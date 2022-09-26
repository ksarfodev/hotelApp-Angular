import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators'
import { ForwardRefHandling } from '@angular/compiler';

import { PreferredDates } from '../interfaces/preferred-dates';
import { CalendarService } from '../services/calendar.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss']
})


export class RoomSearchComponent implements OnInit {

  preferredDates:PreferredDates;

  constructor(public calendarService:CalendarService,private apiService:ApiService,private router:Router) {
    this.preferredDates = { startdate: new Date(), enddate: new Date()};
   }



  ngOnInit(): void {
   
    this.calendarService.preferredDates.subscribe(preferredDates => this.preferredDates = preferredDates);
  }
  
errorMessage?:string;
isError?:boolean;

  getRooms(){
    //show loading animation
  
      this.calendarService.getDates().subscribe();

     console.log(this.preferredDates);

     

    this.apiService.getAvailableRooms(this.preferredDates)
    .subscribe(
      (response) =>{
      console.log(response)
      this.apiService.listOfRooms = response;
      if(this.apiService.listOfRooms)
      {
        this.errorMessage  = "";
        this.isError = false;
         //remove loading animation
        this.router.navigateByUrl('room-booking');
      }
    },
    (error) => {
      console.error('error........')
      this.errorMessage = error;
      this.isError = true;
    }
    );
    
      
 
    
 

   
//   events:string[] = [];
//   postId:any;

 
// //_dates:DateRange<Date>;
//   start_date = new FormControl(new Date());
//   end_date = new FormControl(new Date());

//   constructor(private http:HttpClient) { }

//   getRooms()
//   {
//         console.log("start date " + this.start_date.value);
//     console.log("end date " + this.end_date.value);

//   //      const headers = { "Access-Control-Allow-Origin": "*",
//   //  "content-type": "application/json"
//   //   };
  
//   //   this.http.post<AvailableRooms>('https://localhost:7077/api/roomsearch',
//   //   {
//   //     startDate:this.start_date.value,
//   //     endDate:this.end_date.value,
//   //     headers
//   //   }).subscribe(data => {
//   //     this.postId = data.description;
//   //     console.log(data);
//   //   })
//   }

//   ngOnInit(): void {
//   //   const headers = { "Access-Control-Allow-Origin": "*",
//   //  "content-type": "application/json"
//   //   };
  
//   //   this.http.post<AvailableRooms>('https://localhost:7077/api/roomsearch',
//   //   {
//   //     startDate:'9-18-22',
//   //     endDate:'9-19-22',
//   //     headers
//   //   }).subscribe(data => {
//   //     this.postId = data.description;
//   //     console.log(data);
//   //   })
//   }


//   //event not needed

//   addEvent(type:string,event:MatDatepickerInputEvent<Date>){
//     this.events.push(`${type}: ${event.value}`)

//     if(event.targetElement.id === "mat-input-0")
//     {
//       //this.end_date = new FormControl( new Date(event.target.value));
//     }
//     //console.log(this.end_date.value);
//     //console.log("start date " + this.start_date.value);
//     //console.log("end date " + this.end_date.value);
 // }

}
}

interface AvailableRooms{
  
    id: number;
    title: string;
    description: string;
    price: number;

}
