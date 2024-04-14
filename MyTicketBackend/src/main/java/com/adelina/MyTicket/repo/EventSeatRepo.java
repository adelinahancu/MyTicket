package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.EventSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSeatRepo extends JpaRepository<EventSeat,Long> {
}
