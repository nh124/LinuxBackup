package com.campus_connect.campus_connect.Users.Auth;

import com.campus_connect.campus_connect.Users.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String fistname;
    private String lastname;
    private String username;
    private String password;
    private String email;
    private String major;
    private Role role;
}
