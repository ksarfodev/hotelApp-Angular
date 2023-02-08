export interface AvailableRooms{
    id: number;
    title: string;
    description: string;
    price: number;
}

export interface RoomsResponse{
    id:number,
    isAvailable:boolean
  }