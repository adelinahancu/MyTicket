package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.repo.LocationRepo;
import com.adelina.MyTicket.repo.SeatRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepo seatRepo;



  public List<Seat> getAllSeatsForLocation(Location location){

      return seatRepo.findByLocation(location);
  }


}
