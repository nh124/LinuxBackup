package com.universit.UniversityConnectServer.Users.AuthAccessPoint.UserAuthAccess;

import com.universit.UniversityConnectServer.Users.Repository.UserRepository;
import com.universit.UniversityConnectServer.Users.User.Role;
import com.universit.UniversityConnectServer.Users.User.UsersEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthAccessPointService {
    private final UserRepository repository;
    private final UserRepository userRepository;

    public List<UsersEntity> getAll(){
        return repository.findAll();
    }

    public Optional<?> getAuthenticatedUserData(){
        String nameOfUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UsersEntity> user = repository.findByUsername(nameOfUser);
        return user;
    }
    public Integer getNumberOfUser(Role role){
        return userRepository.countByRole(role);
    }
}
