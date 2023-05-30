package com.campus_connect.campus_connect.Users.Service;


import com.campus_connect.campus_connect.Users.Dto.LoginDTO;
import com.campus_connect.campus_connect.Users.Dto.RegistrationDto;
import com.campus_connect.campus_connect.Users.Model.Role;
import com.campus_connect.campus_connect.Users.Model.UsersEntity;
import com.campus_connect.campus_connect.Users.Repository.RoleRepository;
import com.campus_connect.campus_connect.Users.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class UnauthorizedUserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private AuthenticationManager authenticationManager;

    @Autowired
    public UnauthorizedUserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
    }

    public ResponseEntity<String> register(@RequestBody RegistrationDto registrationDto){
        if(userRepository.existsByUsername(registrationDto.getUsername())){
            return new ResponseEntity<String>("User is taken", HttpStatus.BAD_REQUEST);
        }
            Role role = roleRepository.findByName("USER").orElse(null);
            UsersEntity usersEntity = new UsersEntity();
            usersEntity.setFirstName(registrationDto.getFirstName());
            usersEntity.setLastName(registrationDto.getLastName());
            usersEntity.setUsername(registrationDto.getUsername());
            usersEntity.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
            usersEntity.setEmail(registrationDto.getEmail());
            usersEntity.setPhone(registrationDto.getPhone());
            usersEntity.setMajor(registrationDto.getMajor());
            usersEntity.setRoles(Collections.singletonList(role));
            userRepository.save(usersEntity);
            return new ResponseEntity<>("User Registrations was Successful", HttpStatus.OK);
        }
    public ResponseEntity<String> Login(@RequestBody LoginDTO loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User Login Successful", HttpStatus.OK);
    }

    public List<UsersEntity> allUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<String> deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
        return new ResponseEntity<>("User with id " + id + " has been deleted", HttpStatus.OK);
    }
}