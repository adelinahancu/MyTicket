package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.Visit;
import com.adelina.MyTicket.repo.VisitRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VisitService {
    private final VisitRepo visitRepo;

    private void initializeCounter(){
        if(visitRepo.count()==0){
            visitRepo.save(new Visit(null,0L));
        }
    }

    public Long incrementVisitCount(){
        Visit visit=visitRepo.findFirstByOrderByIdAsc();
        visit.setCount(visit.getCount()+1);
        visitRepo.save(visit);
        return visit.getCount();
    }

    public Long getVisitCount(){
        return visitRepo.findFirstByOrderByIdAsc().getCount();
    }


}
