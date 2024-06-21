package com.adelina.MyTicket.service;

import com.adelina.MyTicket.dto.ChargeRequest;
import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.Charge;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import javax.security.sasl.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {
    private String secretKey="sk_test_51P92cMP1emHE3cOZbxut2nKVMayfMGCGFEnf1AmyakyQyKse6CaWYK4d6Y65iMMj9Ffi95VBOxhQ71GelheMR2mL00z8qRbPw7";
    @PostConstruct
    public void init(){
        Stripe.apiKey=secretKey;
    }
    public Charge charge(ChargeRequest chargeRequest)
            throws AuthenticationException, StripeException,InvalidRequestException,
             CardException, ApiException,ApiConnectionException{
        Map<String,Object> chargeParams=new HashMap<>();
        chargeParams.put("amount",chargeRequest.getAmount());
        chargeParams.put("currency",chargeRequest.getCurrency());
        chargeParams.put("customer",chargeRequest.getCustomer());
        return  Charge.create(chargeParams);
    }
}
