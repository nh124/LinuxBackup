package com.campus_connect.campus_connect.Users.Controller;

import com.campus_connect.campus_connect.Users.Model.Role;
import com.campus_connect.campus_connect.Users.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class RoleController {
    @Autowired
    RoleService roleService;

    @PostMapping("/addRoles")
    public Role addRoles(@RequestBody Role role){
        return roleService.addRoles(role);
    }
}
