package com.adelina.MyTicket.service;

import com.adelina.MyTicket.auth.AuthenticationRequest;
import com.adelina.MyTicket.dto.EventSalesMessage;
import com.adelina.MyTicket.model.*;
import com.adelina.MyTicket.payload.EmailAttachment;
import com.adelina.MyTicket.payload.MultipleTicketsRequest;
import com.adelina.MyTicket.payload.TicketRequest;
import com.adelina.MyTicket.repo.EventRepo;
import com.adelina.MyTicket.repo.TicketRepository;
import com.adelina.MyTicket.repo.UserRepo;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;
import org.apache.commons.io.FileUtils;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepo userRepo;
    private final EventRepo eventRepo;

    private final EmailSenderService emailSenderService;
    private final PdfGeneratorService pdfGeneratorService;
    private final SimpMessagingTemplate messagingTemplate;
    public boolean isSeatAvailableForEvent(Event event, Seat seat) {

        Ticket ticket = ticketRepository.findByEventAndSeat(event, seat);
        return ticket == null;

    }

    public List<Ticket> ticketsForEvent(int eventId) {
        return ticketRepository.findByEventId(eventId);
    }



    public List<Ticket> reserve(MultipleTicketsRequest ticketsRequest) throws MessagingException, DocumentException {
        Event event = ticketsRequest.getEvent();
        List<Seat> seats = ticketsRequest.getSeats();
        List<String> ticketPdfPaths=new ArrayList<>();

        List<Ticket> reservedTickets = new ArrayList<>();

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Type of UserDetails object: " + userDetails.getClass().getName());
        String username = userDetails.getUsername();


        Optional<User> optionalUser = userRepo.findByEmail(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            for (Seat seat : seats) {
                boolean isSeatAvailable = isSeatAvailableForEvent(event, seat);
                if (!isSeatAvailable) {
                    // If any seat is not available, return bad request
                    return null;
                } else {


                    Ticket ticket = new Ticket();
                    ticket.setUser(user);
                    ticket.setEvent(event);
                    ticket.setSeat(seat);
                    ticket.setBooked(true);
                    ticket.setLocation(event.getLocation());
                    ticket.setPurchaseDate(LocalDateTime.now());
                    ticket.setTicketPrice(BigDecimal.valueOf(event.getTicketPrice()));
                    ticketRepository.save(ticket);
                    reservedTickets.add(ticket);
                    String ticketPdfPath="src/main/resources/static/file_with_qrcode/ticket_"+ticket.getSeat().getSeatNumber()+".pdf";
                    pdfGeneratorService.generateTicketPdf(ticket,ticketPdfPath);
                    ticketPdfPaths.add(ticketPdfPath);
                 //  emailSenderService.sendMailWithAttachment(username,"Bilet rezervat cu succes!","Bilete","src/main/resources/static/file_with_qrcode/ticket.pdf");

                }
            }
        }

        long ticketsSold = getTicketsSoldForEvent(event.getId());
        event.setTicketsSold(ticketsSold);
        eventRepo.save(event);
        messagingTemplate.convertAndSend("/topic/ticketSalesUpdates/" + event.getId(),
                new EventSalesMessage(event.getId(), ticketsSold));
        //emailSenderService.sendEmail(username,"Bilete","Bilete rezervate cu succes");
       // emailSenderService.sendMailWithAttachment(username,"Bilete rezervate cu success!","Bilete","C:\\Users\\adeli\\Downloads\\NOTE DE CURS.pdf");
        emailSenderService.sendMailWithAttachments(username,"Bună ziua! \n\n Ați cumpărat cu succes bilet-ul/tele.\nGăsiți atașate biletele în format pdf și qr codul corespunzător.","Bilete",ticketPdfPaths);
        return reservedTickets;
    }


    public List<Ticket> findTicketsByUserId(Long userId){
        return ticketRepository.findTicketsByUserId(userId);

    }

    public List<Ticket> findTicketsByUserEmail(String email){
        return ticketRepository.findTicketsByUserEmail(email);
    }

    public Ticket findTicketById(int ticketId){
        return ticketRepository.findTicketByTicketId(ticketId);
    }

    public long getTicketsSoldForCurrentMonth(){
        YearMonth currentMonth=YearMonth.now();
        LocalDateTime startOfMonth=currentMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth=currentMonth.plusMonths(1).atDay(1).atStartOfDay();
        return ticketRepository.countTicketsSoldForCurrentMonth(startOfMonth,endOfMonth);

    }

    public List<Object[]> getWeeklyTicketSales(LocalDateTime startDate,LocalDateTime endDate){
        return ticketRepository.findWeeklyTicketSales(startDate,endDate);
    }

    public List<Object[]> getTicketCountByEvent() {
        return ticketRepository.findTicketCountByEvent();
    }

    public long getTicketsSoldForEvent(int eventId){
        return ticketRepository.countTicketsSoldForEvent(eventId);
    }

}


