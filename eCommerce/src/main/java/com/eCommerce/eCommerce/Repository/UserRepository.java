package com.eCommerce.eCommerce.Repository;

import com.eCommerce.eCommerce.Model.Cart;
import com.eCommerce.eCommerce.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(name = "SELECT * FROM user WHERE user.user_id = ?1", nativeQuery = true)
    User findUserById(int id);
}
