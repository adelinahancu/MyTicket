package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.model.Seat;
import com.adelina.MyTicket.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/seats")
public class SeatController {

    private final SeatService seatService;



}
