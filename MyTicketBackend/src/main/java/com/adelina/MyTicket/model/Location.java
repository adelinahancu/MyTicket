package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String locationName;
    private String address;
    private int capacity;
    private boolean hasSeats;
    private String imageUrl;

    @OneToMany(mappedBy="location")
    private List<Seat> seats;

    @OneToMany
    private List<Event> events;

    public boolean hasSeats() {
        return seats != null && !seats.isEmpty();
    }




}
