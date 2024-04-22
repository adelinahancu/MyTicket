package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {

    Ticket findByEventAndSeat(Event event, Seat seat);

    List<Ticket>  findByEventId(int eventId);
}
