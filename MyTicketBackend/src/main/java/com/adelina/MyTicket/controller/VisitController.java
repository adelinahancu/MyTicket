package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.service.VisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping("/api/v1/visit")
public class VisitController {
    private final VisitService visitService;

    @GetMapping("/increment")
    public ResponseEntity<Long> incrementVisitCount(){
        return new ResponseEntity<>(visitService.incrementVisitCount(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getVisitCount(){
        Long count= visitService.getVisitCount();
        return new ResponseEntity<>(count,HttpStatus.OK);
    }
}
