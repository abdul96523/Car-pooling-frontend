export interface IgetMatchedRides
{
    source:number,
    destination:number,
    date:string,
    time:string
}

export interface IofferRideDetails
{
    sourceId: any;
    destinationId: any;
    date: string;
    time: string;
    userId: number;
    seats: number;
    price: number;
    Stops: string[];
}
export interface IofferDetails
{
    offeredUserId: number,
    sourceName: string,
    destinationName:string,
    date: string,
    time: string,
    offerRideId: number,
    seatsBooked: number,
    price: number,
    bookingUserName:string
}
