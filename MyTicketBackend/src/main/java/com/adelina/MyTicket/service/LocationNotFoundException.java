package com.adelina.MyTicket.service;

public class LocationNotFoundException extends RuntimeException {
    public LocationNotFoundException() {
        super();
    }
    public LocationNotFoundException(String message) {
        super(message);
    }
}
