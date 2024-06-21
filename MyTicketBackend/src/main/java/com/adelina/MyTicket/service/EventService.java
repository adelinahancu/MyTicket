package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.repo.EventRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepo eventRepo;


    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }

    public Event getEvent(int eventId){
        return eventRepo.findById(eventId).orElseThrow(()->new RuntimeException("Event not found with id:"+eventId));
    }

    public List<Object[]> getRevenueByEvent() {
        return eventRepo.findRevenueByEvent();
    }

    public Event addEvent(Event event){
       return  eventRepo.save(event);
    }

    public List<Event> searchEvents(String query) {
        return eventRepo.searchEvents(query);
    }
}
