package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.service.EventService;
import com.adelina.MyTicket.service.LocationService;
import com.adelina.MyTicket.service.SeatService;
import com.adelina.MyTicket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/events")
@CrossOrigin(origins="http://localhost:4200")
public class EventController {
    private final SeatService seatService;
    private final EventService eventService;
    private final LocationService locationService;
    private final TicketService ticketService;
   @GetMapping("/allEvents")
    public ResponseEntity<?> getAllEvents(){
       List<Event> events=eventService.getAllEvents();
       return ResponseEntity.ok(events);
   }
    @GetMapping("getEventSeat/{id}")
    public ResponseEntity<?> getSeatsForEvent(@PathVariable int id){
        Event event=eventService.getEvent(id);
        List<Seat> seats=seatService.getAllSeatsForLocation(event.getLocation());
        return ResponseEntity.ok(seats);
    }
   @GetMapping("/getEvent/{id}")
    public ResponseEntity<?> getEvent(@PathVariable int id){
       return ResponseEntity.ok(eventService.getEvent(id));
   }



    @GetMapping("/search")
    public List<Event> searchEvents(@RequestParam String query) {
        return eventService.searchEvents(query);
    }

    @GetMapping("/{id}/ticketsSold")
    public ResponseEntity<?> getTicketsSoldForEvent(@PathVariable int id){
       return new ResponseEntity<>(ticketService.getTicketsSoldForEvent(id),HttpStatus.OK);


    }

}
