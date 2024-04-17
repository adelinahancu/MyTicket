package com.adelina.MyTicket.service;

import com.adelina.MyTicket.auth.AuthenticationRequest;
import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.model.Ticket;
import com.adelina.MyTicket.model.User;
import com.adelina.MyTicket.repo.TicketRepository;
import com.adelina.MyTicket.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepo userRepo;

    public boolean isSeatAvailableForEvent(Event event, Seat seat){

        Ticket ticket=ticketRepository.findByEventAndSeat(event,seat);
        return ticket==null;

    }

    public void reserveTicket(Event event, Seat seat) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> optionalUser = userRepo.findByEmail(userDetails.getUsername());
        if (optionalUser.isPresent()) {
            User user=optionalUser.get();

            Ticket ticket = new Ticket();
            ticket.setUser(user);
            ticket.setEvent(event);
            ticket.setSeat(seat);
            ticket.setBooked(true);
            ticket.setPurchaseDate(LocalDateTime.now());
            ticketRepository.save(ticket);

        }
    }

}


