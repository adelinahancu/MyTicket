import { Ticket } from "./ticket.model";

export class Event{
    id:number;
    eventName:string;
    description:string;
    location:Location;
    category:string;
    eventDate:Date;
    imageUrl:string;
    tickets:Ticket[];

}