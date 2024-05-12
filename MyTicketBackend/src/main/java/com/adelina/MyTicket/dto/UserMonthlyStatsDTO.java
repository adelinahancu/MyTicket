package com.adelina.MyTicket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMonthlyStatsDTO {
    private String month;
    private Long userCount;
}
