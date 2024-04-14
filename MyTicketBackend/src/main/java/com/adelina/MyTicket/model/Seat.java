package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int seatNumber;
    private int rowNumber;
    @ManyToOne
    private Location location;

    @OneToMany(mappedBy = "seat",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<EventSeat> eventSeats;


}
