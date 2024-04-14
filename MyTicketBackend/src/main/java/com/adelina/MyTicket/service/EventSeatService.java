package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.EventSeat;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.repo.EventRepo;
import com.adelina.MyTicket.repo.EventSeatRepo;
import com.adelina.MyTicket.repo.SeatRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class EventSeatService {

    private final EventSeatRepo eventSeatRepo;
    private final EventRepo eventRepo;
    private final SeatRepo seatRepo;


    public void assignSeatsToEvent(Integer eventId, Set<Long> seatIds){
        Event event=eventRepo.findById(eventId).orElseThrow(()->new RuntimeException("Event not found"));

        for(Long seatId: seatIds){
            Seat seat=seatRepo.findById(seatId).orElseThrow(()->new RuntimeException("Seat not found"));


            EventSeat eventSeat=new EventSeat();
            eventSeat.setEvent(event);
            eventSeat.setSeat(seat);
            eventSeat.setBooked(false);
            eventSeat.setBookingPrice(BigDecimal.ZERO);
            eventSeatRepo.save(eventSeat);
        }
    }
}
