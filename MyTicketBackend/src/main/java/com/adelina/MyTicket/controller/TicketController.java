package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.payload.TicketRequest;
import com.adelina.MyTicket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveTicket(@RequestBody TicketRequest ticketRequest) {

        Event event=ticketRequest.getEvent();
        Seat seat=ticketRequest.getSeat();
        boolean isSeatAvailable = ticketService.isSeatAvailableForEvent(event, seat);

        if (isSeatAvailable) {

            ticketService.reserveTicket(event, seat);
            return ResponseEntity.ok("Bilet rezervat cu succes!");
        } else {

            return ResponseEntity.badRequest().body("Locul este deja ocupat.");
        }
    }
}
