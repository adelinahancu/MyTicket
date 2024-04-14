package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event,Integer> {

    @Query("SELECT COUNT(e) FROM Event e WHERE e.location.id = :locationId AND e.eventDate >= :currentDate")
    int countEventsByLocationAfterDate(@Param("locationId") int locationId, @Param("currentDate") LocalDateTime currentDate);
}
