package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.auth.MessageResponse;
import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.service.LocationService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/location")
@CrossOrigin
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

    @PostMapping("/addLocation")
    public ResponseEntity<?> addLocation(@RequestBody Location location){
       locationService.addLocation(location);
        return ResponseEntity.ok(new MessageResponse("Location was added successfully"));
    }

    @PutMapping("/updateLocation/{id}")
    public ResponseEntity<?> updateLocation(@PathVariable Long id ,@RequestBody Location newLocation){
        locationService.updateLocation(id,newLocation);
        return ResponseEntity.ok(new MessageResponse("Location was updated successfully"));
    }

    @DeleteMapping("/deleteLocation/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id){
        locationService.deleteLocation(id);
        return ResponseEntity.ok(new MessageResponse("Location with id "+id+" was deleted successfully"));
    }



}
