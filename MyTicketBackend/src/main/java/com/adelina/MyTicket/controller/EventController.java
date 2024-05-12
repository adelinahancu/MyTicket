package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.service.EventService;
import com.adelina.MyTicket.service.LocationService;
import com.adelina.MyTicket.service.SeatService;
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

   @GetMapping("/allEvents")
    public ResponseEntity<?> getAllEvents(){
       List<Event> events=eventService.getAllEvents();
       return ResponseEntity.ok(events);
   }

   @GetMapping("/getEvent/{id}")
    public ResponseEntity<?> getEvent(@PathVariable int id){
       return ResponseEntity.ok(eventService.getEvent(id));
   }

   @GetMapping("getEventSeat/{id}")
    public ResponseEntity<?> getSeatsForEvent(@PathVariable int id){
       Event event=eventService.getEvent(id);
       List<Seat> seats=seatService.getAllSeatsForLocation(event.getLocation());

       return ResponseEntity.ok(seats);

   }

   @GetMapping("/get-events-revenue")
    public ResponseEntity<List<Object[]>> getEventRevenue(){
       return new ResponseEntity<>(eventService.getRevenueByEvent(), HttpStatus.OK);
   }

   @PostMapping("/addEvent")
    public ResponseEntity<?> addEvent(@RequestBody Event event){
       return ResponseEntity.ok(eventService.addEvent(event));
   }


}
