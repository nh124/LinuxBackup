package com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.chatController;

import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatDto;
import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Services.ChatService;
import com.campus_connect.campus_connect.Users.Repository.ChatRepository;
import com.campus_connect.campus_connect.Users.Repository.UserRepository;
import com.campus_connect.campus_connect.Users.User.UsersEntity;
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

