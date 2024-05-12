package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.auth.AuthenticationRequest;
import com.adelina.MyTicket.auth.MessageResponse;
import com.adelina.MyTicket.config.JwtService;
import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.model.Ticket;
import com.adelina.MyTicket.payload.MultipleTicketsRequest;
import com.adelina.MyTicket.payload.TicketRequest;
import com.adelina.MyTicket.service.PdfGeneratorService;
import com.adelina.MyTicket.service.TicketService;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("api/v1/ticket")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    private final PdfGeneratorService pdfGeneratorService;

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveTicket(@RequestBody MultipleTicketsRequest ticketRequest) throws MessagingException, DocumentException {
        List<Ticket> reservedTickets = ticketService.reserve(ticketRequest);
        if (reservedTickets.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("Empty"));
        return ResponseEntity.ok(reservedTickets);
    }

    @GetMapping("/allTickets/{eventId}")
    public ResponseEntity<?> getAllTickets(@PathVariable int eventId) {
        return ResponseEntity.ok(ticketService.ticketsForEvent(eventId));
    }

    @PostMapping("/checkSeatAvailability")
    public ResponseEntity<Boolean> checkSeatAvailability(@RequestBody TicketRequest request) {
        Event event = request.getEvent();
        Seat seat = request.getSeat();

        boolean isSeatAvailable = ticketService.isSeatAvailableForEvent(event, seat);

        return ResponseEntity.ok(isSeatAvailable);
    }

//    @GetMapping("/userTickets/{userId}")
//    public ResponseEntity<?> getUsersTickets(@PathVariable Long userId){
//        return ResponseEntity.ok(ticketService.findTicketsByUserId(userId));
//    }

    @GetMapping("/userTickets/{email}")
    public ResponseEntity<?> getUserTickets(@PathVariable String email){
        return  ResponseEntity.ok(ticketService.findTicketsByUserEmail(email));
    }

    @PostMapping("/{ticketId}/pdf")
    public ResponseEntity<Resource> generateTicketPdf(@PathVariable int ticketId) throws DocumentException {
        Ticket ticket=ticketService.findTicketById(ticketId);

        String filePath="src/main/resources/static/file_with_qrcode/ticket_"+ticket.getSeat().getSeatNumber()+".pdf";
        pdfGeneratorService.generateTicketPdf(ticket,filePath);
        Resource resource=new FileSystemResource(filePath);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(resource);

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
