package com.adelina.MyTicket.service;

import com.adelina.MyTicket.repo.EventRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepo eventRepo;

    public int countEventsByLocationAfterDate(int locationId,LocalDateTime currentDate){
        return eventRepo.countEventsByLocationAfterDate(locationId,currentDate);
    }
}
