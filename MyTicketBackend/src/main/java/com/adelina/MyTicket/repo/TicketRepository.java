package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {

    Ticket findByEventAndSeat(Event event, Seat seat);

    List<Ticket>  findByEventId(int eventId);

    List<Ticket> findTicketsByUserId(Long userId);

    List<Ticket> findTicketsByUserEmail(String email);

    Ticket findTicketByTicketId(int ticketId);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.purchaseDate >= :startDate AND t.purchaseDate < :endDate AND t.isBooked = true")
    long countTicketsSoldForCurrentMonth(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT MONTH(t.purchaseDate) AS month, WEEK(t.purchaseDate) AS week, COUNT(t) AS count " +
            "FROM Ticket t " +
            "WHERE t.purchaseDate BETWEEN :startDate AND :endDate " +
            "GROUP BY MONTH(t.purchaseDate), WEEK(t.purchaseDate) " +
            "ORDER BY MONTH(t.purchaseDate), WEEK(t.purchaseDate)")
    List<Object[]> findWeeklyTicketSales(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT e.eventName, COUNT(t) FROM Ticket t JOIN t.event e GROUP BY e.eventName")
    List<Object[]> findTicketCountByEvent();

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.event.id = :eventId")
    long countTicketsSoldForEvent(@Param("eventId") int eventId);
}

