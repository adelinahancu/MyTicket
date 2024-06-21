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

    @Query("SELECT e FROM Event e WHERE " +
            "LOWER(e.eventName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.location.locationName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "STR(e.eventDate) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.startTime) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.endTime) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "STR(e.ticketPrice) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Event> searchEvents(@Param("query") String query);


}
