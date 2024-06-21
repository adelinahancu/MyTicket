package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.auth.MessageResponse;
import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.payload.LocationRequest;
import com.adelina.MyTicket.service.LocationService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/location")
@CrossOrigin(origins="http://localhost:4200")
public class LocationController {
    private final LocationService locationService;


    @GetMapping("/getLocation/{id}")
    public ResponseEntity<?> getLocation(@PathVariable Long id){
        return ResponseEntity.ok(locationService.getLocationById(id));

    }

    @GetMapping("/getAllLocations")
    public ResponseEntity<?> getAllLocations(){
        return ResponseEntity.ok(locationService.getAllLocations());
    }





}
