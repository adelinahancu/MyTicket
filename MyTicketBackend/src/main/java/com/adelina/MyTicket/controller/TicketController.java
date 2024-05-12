package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.auth.AuthenticationRequest;
import com.adelina.MyTicket.auth.MessageResponse;
import com.adelina.MyTicket.config.JwtService;
import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.model.Ticket;
import com.adelina.MyTicket.payload.MultipleTicketsRequest;
import com.adelina.MyTicket.payload.TicketRequest;
import com.adelina.MyTicket.service.TicketService;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/ticket")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveTicket(@RequestBody MultipleTicketsRequest ticketRequest) throws MessagingException, DocumentException {
        List<Ticket> reservedTickets = ticketService.reserve(ticketRequest);
        if (reservedTickets.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("Empty"));
        return ResponseEntity.ok(reservedTickets);
    }

    @GetMapping("/allTickets/{eventId}")
    public ResponseEntity<?> getAllTickets(@PathVariable int eventId) {
        return ResponseEntity.ok(ticketService.ticketsForEvent(eventId));
    }

    @PostMapping("/checkSeatAvailability")
    public ResponseEntity<Boolean> checkSeatAvailability(@RequestBody TicketRequest request) {
        Event event = request.getEvent();
        Seat seat = request.getSeat();

        boolean isSeatAvailable = ticketService.isSeatAvailableForEvent(event, seat);

        return ResponseEntity.ok(isSeatAvailable);
    }
}
