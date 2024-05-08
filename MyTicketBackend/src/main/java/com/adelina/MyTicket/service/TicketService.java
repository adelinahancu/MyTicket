package com.adelina.MyTicket.service;

import com.adelina.MyTicket.auth.AuthenticationRequest;
import com.adelina.MyTicket.model.*;
import com.adelina.MyTicket.payload.MultipleTicketsRequest;
import com.adelina.MyTicket.payload.TicketRequest;
import com.adelina.MyTicket.repo.TicketRepository;
import com.adelina.MyTicket.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepo userRepo;

    public boolean isSeatAvailableForEvent(Event event, Seat seat) {

        Ticket ticket = ticketRepository.findByEventAndSeat(event, seat);
        return ticket == null;

    }

    public List<Ticket> ticketsForEvent(int eventId) {
        return ticketRepository.findByEventId(eventId);
    }



    public List<Ticket> reserveTickets(MultipleTicketsRequest ticketsRequest) {
        Event event = ticketsRequest.getEvent();
        List<Seat> seats = ticketsRequest.getSeats();


        List<Ticket> reservedTickets = new ArrayList<>();

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Type of UserDetails object: " + userDetails.getClass().getName());
        String username = userDetails.getUsername();


        Optional<User> optionalUser = userRepo.findByEmail(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            for (Seat seat : seats) {
                boolean isSeatAvailable = isSeatAvailableForEvent(event, seat);
                if (!isSeatAvailable) {
                    // If any seat is not available, return bad request
                    return null;
                } else {


                    Ticket ticket = new Ticket();
                    ticket.setUser(user);
                    ticket.setEvent(event);
                    ticket.setSeat(seat);
                    ticket.setBooked(true);
                    ticket.setLocation(event.getLocation());
                    ticket.setPurchaseDate(LocalDateTime.now());
                    ticket.setTicketPrice(BigDecimal.valueOf(event.getTicketPrice()));
                    ticketRepository.save(ticket);
                    reservedTickets.add(ticket);
                }
            }
        }


        return reservedTickets;
    }
}


