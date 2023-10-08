package com.campus_connect.campus_connect.Users.Auth;

import com.campus_connect.campus_connect.Users.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository userRepository;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            return new ResponseEntity<String>("User with " + request.getUsername() + " already exists", HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticateRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

}
