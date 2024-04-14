package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.service.EventService;
import com.adelina.MyTicket.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final SeatService seatService;

   private final EventService eventService;

   @GetMapping("/countEventsForEachLocation/{locationId}")
   public ResponseEntity<Integer> countEventsByLocationAfterDate(@PathVariable int locationId,LocalDateTime currentDate){
        currentDate=LocalDateTime.now();
       int eventCount=eventService.countEventsByLocationAfterDate(locationId,currentDate);
       return ResponseEntity.ok(eventCount);
   }

}
