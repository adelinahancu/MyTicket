package com.adelina.MyTicket.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailAttachment {
    private String fileName;
    private byte[] data;

}
