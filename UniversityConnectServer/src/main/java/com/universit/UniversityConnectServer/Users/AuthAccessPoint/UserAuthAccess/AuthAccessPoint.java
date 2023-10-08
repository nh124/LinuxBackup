package com.campus_connect.campus_connect.Users.AuthAccessPoint.UserAuthAccess;

import com.campus_connect.campus_connect.Users.Repository.UserRepository;
import com.campus_connect.campus_connect.Users.User.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/access-point")
public class AuthAccessPoint {

    private final AuthAccessPointService authAccessPointService;

    @GetMapping("/getUsers")
    public ResponseEntity<List> sayHello(){
        return ResponseEntity.ok(authAccessPointService.getAll());
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(){
        return ResponseEntity.ok(authAccessPointService.getAuthenticatedUserData());
    }
    @GetMapping("/UserCount/{role}")
    public ResponseEntity<Integer> getNumberOfUser(@PathVariable Role role){
        return ResponseEntity.ok(authAccessPointService.getNumberOfUser(role));
    }
}
