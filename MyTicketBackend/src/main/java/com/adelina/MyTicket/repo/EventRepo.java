package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event,Integer> {
    @Query("SELECT e.eventName, SUM(t.ticketPrice) FROM Ticket t JOIN t.event e GROUP BY e.eventName")
    List<Object[]> findRevenueByEvent();


}
