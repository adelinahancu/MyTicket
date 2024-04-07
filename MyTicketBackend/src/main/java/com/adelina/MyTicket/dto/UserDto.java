package com.adelina.MyTicket.dto;

import com.adelina.MyTicket.model.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String firstname;

    private String lastname;

    private String email;

    private String role;
    private List<Ticket> tickets;
}