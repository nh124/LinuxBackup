package com.universit.UniversityConnectServer.Users.Auth;

import com.universit.UniversityConnectServer.Users.Config.JWTServices;
import com.universit.UniversityConnectServer.Users.Repository.UserRepository;
import com.universit.UniversityConnectServer.Users.User.UsersEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final JWTServices JWTServices;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    public String register(RegisterRequest request) {
        var user = UsersEntity.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepository.save(user);
        return "User with " + request.getUsername() + " has been registered";
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var JWTToken = JWTServices.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(JWTToken)
                .build();
    }

}
