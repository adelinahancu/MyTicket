package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int seatNumber;
    private int rowNumber;
    private int x;
    private int y;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;






}
