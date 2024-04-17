package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String locationName;
    private String address;
    private int capacity;
    private boolean hasSeats;
    private String imageUrl;

    @OneToMany(mappedBy = "location")
    private Set<Seat> seats;
    @OneToMany
    private List<Event> events;






}
