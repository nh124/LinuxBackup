package com.campus_connect.campus_connect.Users.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginDTO {
    public String username;
    public String password;
}
