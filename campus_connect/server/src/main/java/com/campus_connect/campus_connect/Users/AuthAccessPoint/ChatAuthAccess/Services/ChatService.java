package com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Services;

import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatQueryResponse;
import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Model.Chat;
import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatDto;
import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Model.Type;
import com.campus_connect.campus_connect.Users.Repository.ChatRepository;
import com.campus_connect.campus_connect.Users.Repository.UserRepository;
import com.campus_connect.campus_connect.Users.User.UsersEntity;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    public String AddMessage(ChatDto chatDto){
        UsersEntity user = userRepository.findById(chatDto.getUserId()).orElseThrow();
        UsersEntity receiver = null;
        if(chatDto.getReceiverId() > 0){
            receiver = userRepository.findById(chatDto.getReceiverId()).orElseThrow();
        }
        int value = receiver == null ? 0 : receiver.getId();
        var ChatData = Chat.builder()
                .date(new Date(System.currentTimeMillis()))
                .message(chatDto.getMessage())
                .receiver(value)
                .type(chatDto.getType())
                .user(user)
                .build();
        chatRepository.save(ChatData);
        return "Message Saved";
    }

    public List<Chat> getAllChat(){
        return chatRepository.findAll();
    }
}
