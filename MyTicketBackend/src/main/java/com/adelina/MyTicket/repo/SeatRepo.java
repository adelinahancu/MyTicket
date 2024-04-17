package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepo extends JpaRepository<Seat,Long> {



    List<Seat> findByLocation(Location location);

    Seat findByLocationAndSeatNumber(Location location, int seatNumber);


}
