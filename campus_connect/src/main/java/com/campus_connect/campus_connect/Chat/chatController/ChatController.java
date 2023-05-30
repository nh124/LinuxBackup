package com.campus_connect.campus_connect.Chat.chatController;

import com.campus_connect.campus_connect.Chat.Model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        System.out.println("------------------------------");
        System.out.print("Message is public");
        System.out.println(message.getMessage());
        System.out.println("------------------------------");
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        System.out.println("------------------------------");
        System.out.print("Message is private");
        System.out.println(message.getMessage());
        System.out.println("------------------------------");
        return message;
    }
}

