package com.eCommerce.eCommerce.Repository;

import com.eCommerce.eCommerce.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query(name = "Select * from cart where cart.cart_id = ?1")
    Cart findCartById(int id);
}
