package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.dto.EventSalesMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TicketSalesController {

    @MessageMapping("/sales")
    @SendTo("/topic/ticketSales")
    public EventSalesMessage getTicketSales(EventSalesMessage message){
        return message;
    }
}
