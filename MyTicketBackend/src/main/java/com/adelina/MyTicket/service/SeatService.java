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
    private final LocationRepo locationRepo;

    public void populateSeatsForLocation(Long locationId,int numRows,int seatsPerRow){
        Location location=locationRepo.findById(locationId)
                .orElseThrow(()->new RuntimeException("Location not found with id:"+locationId));

        for(int row=1;row<=numRows;row++){
            for(int seatNum=1;seatNum<= seatsPerRow;seatNum++){
                Seat seat=new Seat();
                seat.setSeatNumber(seatNum);
                seat.setRowNumber(row);
                seat.setLocation(location);
                seatRepo.save(seat);
            }
        }
    }


}
