package com.adelina.MyTicket.payload;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequest {
    @NotNull
    private Event event;

    @NotNull
    private Seat seat;

}
