package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.model.Event;
import com.adelina.MyTicket.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepo extends JpaRepository<Location,Long> {


}
