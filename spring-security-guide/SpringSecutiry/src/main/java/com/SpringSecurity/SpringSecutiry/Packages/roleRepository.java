package com.SpringSecurity.SpringSecutiry.Packages;

import com.SpringSecurity.SpringSecutiry.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface roleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
