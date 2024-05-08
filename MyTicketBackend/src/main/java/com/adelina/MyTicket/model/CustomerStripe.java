package com.adelina.MyTicket.model;

import com.stripe.model.Address;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="customers")
public class CustomerStripe {
    @Id
    private String id;
    @Embedded
    private Address address;
    private String description;
    private String email;
    private String name;
    private String phone;

}
