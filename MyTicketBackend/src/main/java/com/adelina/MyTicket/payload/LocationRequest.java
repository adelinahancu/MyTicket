package com.adelina.MyTicket.payload;

import lombok.Data;

@Data
public class LocationRequest {
    private String locationName;
    private String address;
    private String imageURL;
    private int numRows;
    private int seatsPerRow;
}
