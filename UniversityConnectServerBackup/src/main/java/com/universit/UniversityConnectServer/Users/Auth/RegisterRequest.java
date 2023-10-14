package com.universit.UniversityConnectServer.Users.Auth;

import com.universit.UniversityConnectServer.Users.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String username;
    private String password;
    private String email;
    private String major;
    private Role role;
}
