package com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatQueryResponse {
    private Date data;
    private String message;
    private int receiver;
    private String type;
//    private String first_name;
//    private String last_name;
}
