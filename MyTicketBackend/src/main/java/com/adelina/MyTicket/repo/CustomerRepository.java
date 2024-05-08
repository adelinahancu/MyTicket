package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.CustomerStripe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CustomerRepository extends JpaRepository<CustomerStripe, String> {
    Optional<CustomerStripe> findByEmail(String email);
}
