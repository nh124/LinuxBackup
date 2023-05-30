package com.SpringSecurity.SpringSecutiry.controllers;

import com.SpringSecurity.SpringSecutiry.Packages.userRepository;
import com.SpringSecurity.SpringSecutiry.Packages.roleRepository;
import com.SpringSecurity.SpringSecutiry.dto.LoginDto;
import com.SpringSecurity.SpringSecutiry.dto.RegisterDto;
import com.SpringSecurity.SpringSecutiry.model.Role;
import com.SpringSecurity.SpringSecutiry.model.userEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private userRepository userRepository;
    private roleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired

    public AuthController(AuthenticationManager authenticationManager,  userRepository userRepository,
                          roleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if(userRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("username is taken", HttpStatus.BAD_REQUEST);
        }

        userEntity userEntity = new userEntity();
        userEntity.setUsername(registerDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        Role role = roleRepository.findByName("USER").orElse(null);
        userEntity.setRoles(Collections.singletonList(role));
        userRepository.save(userEntity);
        return new ResponseEntity<>("User Registration was Successful", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> Login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginDto.getUsername(),
                    loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User Login Successful", HttpStatus.OK);
    }
}
