interface IBookRideObject
{
    sourceId: number;
    destinationId: number;
    date: string;
    time: string;
    bookedUserId:number;
    offerRideId: number;
    totalPrice: number;
    seatsBooked: number;
}
interface IBookedRideObject
{
    sourceName: string,
    destinationName: string,
    date: string,
    time: string,
    BookedUserId: number,
    offerRideId: number,
    seats: number,
    price: number
    offeredUserName:string
}

export type {IBookRideObject,IBookedRideObject}