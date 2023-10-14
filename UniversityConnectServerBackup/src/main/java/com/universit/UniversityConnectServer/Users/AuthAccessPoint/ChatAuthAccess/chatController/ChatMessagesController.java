package com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.chatController;

import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatQueryDto;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatQueryResponse;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Model.Chat;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Services.ChatService;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/access-point/chat")
public class ChatMessagesController {
    private final ChatService service;

    @PostMapping("/addMessage")
    public ResponseEntity<String> addMessage(@RequestBody ChatDto chatDto){
        return ResponseEntity.ok(service.AddMessage(chatDto));
    }

    @GetMapping("/getAllChats")
    public ResponseEntity<List<Chat>> getAllMessages(){
        return ResponseEntity.ok(service.getAllChat());
    }
}
