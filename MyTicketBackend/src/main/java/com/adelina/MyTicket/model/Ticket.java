package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne
    private Event event;
    @ManyToOne
    private Seat seat;

    @ManyToOne
    private Location location;
    private BigDecimal ticketPrice;
    private LocalDateTime purchaseDate;
    private boolean isBooked=false;
}
