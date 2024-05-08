package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.CustomerStripe;
import com.adelina.MyTicket.repo.CustomerRepository;
import com.stripe.model.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public void saveCustomer(Customer customer){
        CustomerStripe customerStripe=new CustomerStripe();
        customerStripe.setId(customer.getId());
        customerStripe.setEmail(customer.getEmail());
        customerRepository.save(customerStripe);
    }

    public Customer mapFromStripe(CustomerStripe customerStripe){
        Customer customer=new Customer();
        customer.setId(customerStripe.getId());
        customer.setEmail(customerStripe.getEmail());
        return customer;
    }

    public Customer extractCustomer(CustomerStripe customerStripe){
        Optional<CustomerStripe> optionalCustomerStripe=customerRepository.findByEmail(customerStripe.getEmail());
        if(optionalCustomerStripe.isPresent()){
            CustomerStripe extractedCustomerStripe=optionalCustomerStripe.get();
            Customer customer=mapFromStripe(extractedCustomerStripe);
            return customer;
        }else{
            return null;
        }
    }
}
