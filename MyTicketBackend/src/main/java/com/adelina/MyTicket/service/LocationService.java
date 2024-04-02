package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.Location;
import com.adelina.MyTicket.repo.LocationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepo locationRepo;

    public Optional<Location> getLocationById(Long id){
        return locationRepo.findById(id);
    }

    public List<Location> getAllLocations(){
        return locationRepo.findAll();
    }

    public void addLocation(Location location){
        locationRepo.save(location);
    }

    public void updateLocation(Long id, Location location){
       Optional<Location> optionalLocation=locationRepo.findById(id);
       if(optionalLocation.isPresent()){
           Location existingLocation=optionalLocation.get();
           existingLocation.setName(location.getName());
           existingLocation.setAddress(location.getAddress());
           existingLocation.setCapacity(location.getCapacity());
           existingLocation.setHasSeats(location.isHasSeats());
           existingLocation.setImageUrl(location.getImageUrl());
           locationRepo.save(existingLocation);
       }else{
           throw  new LocationNotFoundException("Location not found with id:" +id);
       }



    }

    public void deleteLocation(Long id){
        locationRepo.deleteById(id);
    }
}