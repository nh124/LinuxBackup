package com.campus_connect.campus_connect.Users.Repository;

import com.campus_connect.campus_connect.Users.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
