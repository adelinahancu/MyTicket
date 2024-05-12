package com.adelina.MyTicket.controller;

import com.adelina.MyTicket.dto.UserMonthlyStats;
import com.adelina.MyTicket.dto.UserMonthlyStatsDTO;
import com.adelina.MyTicket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/stats")
@CrossOrigin(origins = "http://localhost:4200")
public class UserStatsController {
    private final UserService userService;

    @GetMapping("/monthly-registration")
    public ResponseEntity<List<UserMonthlyStatsDTO>> getMonthlyRegistration(){
        List<UserMonthlyStats> userMonthlyStatsList = userService.getMonthlyUserRegistrations();
        List<UserMonthlyStatsDTO> userMonthlyStatsDTOList = userMonthlyStatsList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(userMonthlyStatsDTOList, HttpStatus.OK);
    }


    private UserMonthlyStatsDTO convertToDTO(UserMonthlyStats userMonthlyStats) {
        UserMonthlyStatsDTO dto = new UserMonthlyStatsDTO();
        dto.setMonth(userMonthlyStats.getMonth().toString()); // Convert LocalDateTime to String
        dto.setUserCount(userMonthlyStats.getUserCount());
        return dto;
    }


}
