package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name="event_seat")
public class EventSeat {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name="seat_id")
    private Seat seat;

    private boolean isBooked;
    private BigDecimal bookingPrice;
}
