package com.adelina.MyTicket.payload;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultipleTicketsRequest {
    Event event;
    List<Seat> seats;
}
