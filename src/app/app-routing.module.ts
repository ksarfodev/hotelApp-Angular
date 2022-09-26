import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RoomSearchComponent } from './room-search/room-search.component';

const routes: Routes = [
  {path: '', redirectTo:'/room-search',pathMatch:'full'},
  {path:'room-search',component:RoomSearchComponent},
  {path:'room-booking',component:RoomBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
