package com.adelina.MyTicket.service;

import com.adelina.MyTicket.dto.EventSalesMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketSalesService {

    private  final SimpMessagingTemplate messagingTemplate;

    public void updateTicketSales(EventSalesMessage salesMessage){
        messagingTemplate.convertAndSend("/topic/ticketSales",salesMessage);
    }

    @Scheduled(fixedRate = 5000)
    public void sendSalesUpdates(){
        EventSalesMessage salesMessage=new EventSalesMessage();
        salesMessage.setTicketsSold((int)(Math.random()*100));
        updateTicketSales(salesMessage);
    }

}
