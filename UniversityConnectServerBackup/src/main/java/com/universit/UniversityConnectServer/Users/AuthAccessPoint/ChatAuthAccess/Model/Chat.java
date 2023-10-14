package com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Model;

import com.universit.UniversityConnectServer.Users.User.UsersEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Chat {
    @Id
    @GeneratedValue
    private int chatId;
    private String message;
    @Enumerated(EnumType.STRING)
    private Type type;
    @Column(nullable = true)
    private int receiver;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private UsersEntity user;

}