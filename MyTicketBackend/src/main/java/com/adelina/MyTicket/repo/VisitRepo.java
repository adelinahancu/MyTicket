package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepo extends JpaRepository<Visit,Long> {
    Visit findFirstByOrderByIdAsc();
}
