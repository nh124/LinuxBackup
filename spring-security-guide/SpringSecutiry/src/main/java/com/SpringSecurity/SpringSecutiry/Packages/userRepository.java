package com.SpringSecurity.SpringSecutiry.Packages;

import com.SpringSecurity.SpringSecutiry.model.userEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface userRepository extends JpaRepository<userEntity, Integer> {
    Optional<userEntity> findByUsername(String username);
    Boolean existsByUsername(String username);


}
