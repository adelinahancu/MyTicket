package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.auth.MessageResponse;
import com.adelina.MyTicket.dto.ChargeRequest;
import com.adelina.MyTicket.model.CustomerStripe;
import com.adelina.MyTicket.service.CustomerService;
import com.adelina.MyTicket.service.StripeService;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Token;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CheckoutController {

    private String stripePublicKey = "pk_test_51P92cMP1emHE3cOZA7zCVZRJAATQH79PyxmD7g0yjywyDstlVwVuujm74k4wSPufYHgJdN7ftTolH3tt5KFgLtVw00GoGhrAY0";
    private final StripeService stripeService;
    private final CustomerService customerService;
    StripeClient client = new StripeClient("sk_test_51P92cMP1emHE3cOZbxut2nKVMayfMGCGFEnf1AmyakyQyKse6CaWYK4d6Y65iMMj9Ffi95VBOxhQ71GelheMR2mL00z8qRbPw7");


    @PostMapping("/charge")
    public ResponseEntity<?> charge(@RequestBody ChargeRequest chargeRequest)
            throws StripeException, AuthenticationException {

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(chargeRequest.getAmount()*100)
                        .setCurrency("ron")

                        .setPaymentMethod("pm_card_visa")
                        .build();

        PaymentIntent paymentIntent = client.paymentIntents().create(params);

        PaymentIntentConfirmParams param =
                PaymentIntentConfirmParams.builder()
                        .setPaymentMethod("pm_card_visa")
                        .setReturnUrl("https://www.example.com")

                        .build();
        PaymentIntent paymentIntentk = paymentIntent.confirm(param);

//
        return ResponseEntity.ok(paymentIntent.getClass());
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException e) {
        model.addAttribute("error", e.getMessage());
        return "result";
    }

}
