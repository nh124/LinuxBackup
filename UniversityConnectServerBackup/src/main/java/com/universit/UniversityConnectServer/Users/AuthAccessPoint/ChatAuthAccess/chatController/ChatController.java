package com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.chatController;

import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatDto;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Services.ChatService;
import com.universit.UniversityConnectServer.Users.Repository.ChatRepository;
import com.universit.UniversityConnectServer.Users.Repository.UserRepository;
import com.universit.UniversityConnectServer.Users.User.UsersEntity;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;
    private final ChatService chatService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public ResponseEntity<ChatDto> receiveMessage(@Payload ChatDto chatDto){
        chatService.AddMessage(chatDto);
        System.out.println("Public message " + chatDto.getMessage());
        return ResponseEntity.ok(chatDto);
    }

    @MessageMapping("/private-message")
    public ResponseEntity<ChatDto> recMessage(@Payload ChatDto chatDto){
        UsersEntity receiver = userRepository.findById(chatDto.getReceiverId()).orElseThrow();
        String username = receiver.getFirstName() + receiver.getLastName();
        simpMessagingTemplate.convertAndSendToUser(username,"/private",chatDto);
        chatService.AddMessage(chatDto);
        return ResponseEntity.ok(chatDto);
    }
}

