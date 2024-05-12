import { Eveniment } from "./eveniment.model";
import { Seat } from "./seat.model";

export class MultipleTicketsRequest{
    event:Eveniment;
    seats:Seat[];
}