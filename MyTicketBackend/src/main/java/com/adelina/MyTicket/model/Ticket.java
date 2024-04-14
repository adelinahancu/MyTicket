package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketId;
    private String eventName;
    private int seatNumber;
    private int rowNumber;
    private String startHour;
    private String location;
    private BigDecimal ticketPrice;
    private LocalDateTime purchaseDate;
    @ManyToOne
    private User user;
}
