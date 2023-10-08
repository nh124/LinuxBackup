package com.campus_connect.campus_connect.Users.Repository;

import com.campus_connect.campus_connect.Users.User.Role;
import com.campus_connect.campus_connect.Users.User.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UsersEntity, Integer> {

    Optional<UsersEntity> findByUsername(String username);

    Integer countByRole(Role role);
    Boolean existsByUsername(String username);


}
