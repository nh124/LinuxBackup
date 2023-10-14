package com.universit.UniversityConnectServer.Users.Repository;

import com.universit.UniversityConnectServer.Users.User.Role;
import com.universit.UniversityConnectServer.Users.User.UsersEntity;
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
