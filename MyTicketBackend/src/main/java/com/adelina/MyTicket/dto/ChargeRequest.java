package com.adelina.MyTicket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data@AllArgsConstructor@NoArgsConstructor
public class ChargeRequest {
    private String description;
    private Long amount;
    private String currency;
  //  private String stripeEmail;
   // private String stripeToken;
    private String number;
    private Integer expMonth;
    private Integer  expYear;
    private String cvc;
    private String cardHolderName;
    private String email;
    private Map<String ,Object> billingDetails;
    private String customer;



}
