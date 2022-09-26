import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AvailableRooms, RoomsResponse } from '../interfaces/available-rooms';
import { CalendarService } from '../services/calendar.service';
import { PreferredDates } from '../interfaces/preferred-dates';
import {MatDialog} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { SelectedRoom } from '../interfaces/selected-room';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss']
})
export class RoomBookingComponent implements OnInit {

  constructor(private apiService:ApiService,private calendarService:CalendarService,public dialog: MatDialog,
    private bookingService:BookingService) { 

      this.selectedRoom = {roomtypeid:0,firstname:"",lastname:"",startdate:"",enddate:""}
    
    }
  
  listOfRooms?:AvailableRooms[] ;


  tempAvailableRooms?:RoomsResponse[];

  isExecAvailable?:boolean;
  isKingAvailable?:boolean;
  isQueenAvailable?:boolean;

  public queen?:any;
  public king?:any;
  public exec?:any;

  it?:NgForm;

preferredDates?:PreferredDates;

selectedRoom?:SelectedRoom;


  ngOnInit(): void {
    this.calendarService.preferredDates.subscribe(preferredDates => this.preferredDates = preferredDates);
    this.bookingService.selectedRoom.subscribe(selectedRoom => this.selectedRoom = selectedRoom);

    console.log(this.preferredDates?.startdate);
    console.log(this.preferredDates?.enddate);

    this.listOfRooms = this.apiService.listOfRooms;

    this.listOfRooms?.forEach(x => {
      if(x.id === 1){
        this.isKingAvailable = true;
      }
      if(x.id === 2){
        this.isQueenAvailable = true;
      }
      if(x.id === 3){
        this.isExecAvailable = true;
      }
    });
  }

  setRoomType(roomType:number){
    if(this.selectedRoom != undefined)
    {
      this.selectedRoom.roomtypeid = roomType;
    }
    console.log(this.selectedRoom?.roomtypeid);

  }
  openDialog() {

    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  }

  @Component({
    selector: 'room-booking-dialog',
    templateUrl: 'room-booking-dialog.html',
  })

  export class DialogContentExampleDialog {

    firstName:string = "";
    lastName:string = "";

    selectedRoom:SelectedRoom;

    public roomSelection?:string;
    preferredDates?:PreferredDates;
    errorMessage?:string;
    isError?:Boolean;

    constructor(private apiService:ApiService,private calendarService:CalendarService,public dialog: MatDialog,
      private bookingService:BookingService,private router:Router) { 
  
        this.selectedRoom = {roomtypeid:0,firstname:"",lastname:"",startdate:"", enddate: ""}
      
      }

      ownerForm = new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl(''),
      });

    ngOnInit(): void {
      this.bookingService.selectedRoom.subscribe(selectedRoom => this.selectedRoom = selectedRoom);
      this.calendarService.preferredDates.subscribe(preferredDates => this.preferredDates = preferredDates);

      if(this.selectedRoom.roomtypeid === 1)
      {
        this.roomSelection = "King";
      }
      else if(this.selectedRoom.roomtypeid === 2)
      {
        this.roomSelection = "Queen";
      }
      else if(this.selectedRoom.roomtypeid === 3)
      {
        this.roomSelection = "Executive";
      }

    }

    
  BookRoom(){

    if(this.selectedRoom != undefined && this.preferredDates != undefined)
    {
      this.selectedRoom.firstname = this.firstName;
      this.selectedRoom.lastname = this.lastName;
      this.selectedRoom.startdate = this.preferredDates.startdate.toDateString();
      this.selectedRoom.enddate = this.preferredDates.enddate.toDateString();
    }

    console.log(this.selectedRoom);

    this.apiService.bookGuest(this.selectedRoom)
    .subscribe(data =>{
      console.log(data)
      this.isError = false;
      this.router.navigateByUrl('room-search');
    },
    (error) =>{
      console.error('error........')
      this.errorMessage = error;
      this.isError = true;
    });
  }

  }

