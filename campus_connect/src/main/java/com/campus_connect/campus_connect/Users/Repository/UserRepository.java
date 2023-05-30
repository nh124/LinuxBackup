package com.campus_connect.campus_connect.Users.Repository;

import com.campus_connect.campus_connect.Users.Model.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UsersEntity, Integer> {

    Optional<UsersEntity> findByUsername(String username);

    Boolean existsByUsername(String username);

}
