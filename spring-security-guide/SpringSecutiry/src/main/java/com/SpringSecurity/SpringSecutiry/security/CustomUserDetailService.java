package com.SpringSecurity.SpringSecutiry.security;

import com.SpringSecurity.SpringSecutiry.Packages.userRepository;
import com.SpringSecurity.SpringSecutiry.model.Role;
import com.SpringSecurity.SpringSecutiry.model.userEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {


    private userRepository userRepository;
    @Autowired
    public CustomUserDetailService(com.SpringSecurity.SpringSecutiry.Packages.userRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        userEntity user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Username is not found"));
        return new User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }
    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
