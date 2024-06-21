package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.auth.MessageResponse;
import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.service.EventService;
import com.adelina.MyTicket.service.LocationService;
import com.adelina.MyTicket.service.TicketService;
import com.adelina.MyTicket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    private final EventService eventService;
    private final LocationService locationService;
    private final TicketService ticketService;
    @GetMapping("/get-events-revenue")
    public ResponseEntity<List<Object[]>> getEventRevenue(){
        return new ResponseEntity<>(eventService.getRevenueByEvent(), HttpStatus.OK);
    }
   @PostMapping("/addEvent")
    public ResponseEntity<?> addEvent(@RequestBody Event event){
        return ResponseEntity.ok(eventService.addEvent(event));
    }
    @PostMapping("/addLocation")
    public ResponseEntity<?> addLocation(@RequestBody Location location){

       locationService.addLocation(location);
        return ResponseEntity.ok(new MessageResponse("Location was added successfully"));
    }

    @PutMapping("/updateLocation/{id}")
    public ResponseEntity<?> updateLocation(@PathVariable Long id ,@RequestBody Location newLocation){
        locationService.updateLocation(id,newLocation);
        return ResponseEntity.ok(new MessageResponse("Location was updated successfully"));
    }

    @DeleteMapping("/deleteLocation/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id){
        locationService.deleteLocation(id);
        return ResponseEntity.ok(new MessageResponse("Location with id "+id+" was deleted successfully"));
    }

    @GetMapping("/tickets-sold-current-month")
    public ResponseEntity<Long> getTicketsSoldForCurrentMonth(){
        return new ResponseEntity<>(ticketService.getTicketsSoldForCurrentMonth(),HttpStatus.OK);
    }
    @GetMapping("/weekly-ticket-sales")
    public ResponseEntity<List<Object[]>> getWeeklyTicketSales(){
        LocalDateTime startDate= YearMonth.now().minusYears(1).atDay(1).atStartOfDay();
        LocalDateTime endDate=LocalDateTime.now();
        List<Object[]> sales=ticketService.getWeeklyTicketSales(startDate,endDate);
        return new ResponseEntity<>(sales,HttpStatus.OK);
    }
    @GetMapping("/ticket-sales-by-event")
    public List<Object[]> getTicketSalesByEvent() {
        return ticketService.getTicketCountByEvent();
    }
}
