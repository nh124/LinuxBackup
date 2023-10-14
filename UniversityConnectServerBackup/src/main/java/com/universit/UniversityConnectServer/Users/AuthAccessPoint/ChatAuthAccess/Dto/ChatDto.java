package com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto;


import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Model.Status;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Model.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDto {
    private String message;
    private int receiverId;
    private Type type;
    private int userId;
}
