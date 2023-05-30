package com.campus_connect.campus_connect.Users.Service;

import com.campus_connect.campus_connect.Users.Model.Role;
import com.campus_connect.campus_connect.Users.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class RoleService {

    RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role addRoles(@RequestBody Role role){
        return roleRepository.save(role);
    }
}
