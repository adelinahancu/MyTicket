import { Ticket } from "./ticket.model";

export class UserDto{
    firstname:string;
    lastname:string;
    email:string;
    role:string;
    tickets:Ticket[];

}