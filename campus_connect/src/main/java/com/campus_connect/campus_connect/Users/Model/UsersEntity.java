package com.campus_connect.campus_connect.Users.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@Table(name = "user")
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String major;

    @JsonIgnore
    @ManyToMany()
    @JoinTable(name = "user_role",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    List<Role> roles = new ArrayList<>();
}


//    @Column(name = "FIRST_NAME")
//    private String first_name;
//    @Column(name = "LAST_NAME")
//    private String last_name;
//    @Column(name = "EMAIL")
//    private String email;
//    @Column(name = "PHONE")
//    private String phone;
//    @Column(name = "MAJOR")
//    private String major;