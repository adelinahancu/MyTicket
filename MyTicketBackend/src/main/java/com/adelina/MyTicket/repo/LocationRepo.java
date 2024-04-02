package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepo extends JpaRepository<Location,Long> {
}
