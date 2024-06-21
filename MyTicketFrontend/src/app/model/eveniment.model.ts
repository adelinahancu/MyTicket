import { Locatie } from "./location.model";


export class Eveniment{
    id:number;
    eventName:string;
    description:string;
    location:Locatie;
    category:string;
    eventDate:Date;
    imageUrl:string;
    startTime:string;
    endTime:string;
    ticketPrice:number;
    ticketsSold:number;
    

}