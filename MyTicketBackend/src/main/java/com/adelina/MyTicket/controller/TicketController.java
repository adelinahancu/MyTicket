package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.config.JwtService;
import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.model.Ticket;
import com.adelina.MyTicket.payload.TicketRequest;
import com.adelina.MyTicket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/ticket")
@CrossOrigin(origins="http://localhost:4200")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/reserve")
    public ResponseEntity<Ticket> reserveTicket(@RequestBody TicketRequest ticketRequest) {
        try {
            // Extract event and seat details from TicketRequest
            Event event = ticketRequest.getEvent();
            Seat seat = ticketRequest.getSeat();

            // Validate if seat is available (you can implement this logic)
            boolean isSeatAvailable = ticketService.isSeatAvailableForEvent(event, seat);

            if (isSeatAvailable) {
                // Create a new Ticket entity
                Ticket reservedTicket = ticketService.reserveTicket(event, seat);
                return ResponseEntity.ok(reservedTicket); // Return the reserved ticket
            } else {
                return ResponseEntity.badRequest().body(null); // Seat is already booked or unavailable
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Handle any exceptions
        }
    }

    @GetMapping("/allTickets/{eventId}")
    public ResponseEntity<?> getAllTickets(@PathVariable int eventId){
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
