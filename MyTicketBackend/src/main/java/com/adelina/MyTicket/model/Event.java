package com.adelina.MyTicket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String eventName;
    private String description;
    @ManyToOne
    private Location location;
    private String category;
    private LocalDateTime eventDate;
    private String imageUrl;
    @OneToMany(mappedBy="event")
    private List<Ticket> tickets;
}
