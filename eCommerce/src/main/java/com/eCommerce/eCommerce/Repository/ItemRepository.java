package com.eCommerce.eCommerce.Repository;

import com.eCommerce.eCommerce.Model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Items, Integer> {
    @Query(name = "SELECT * FROM items where items.item_id=?1", nativeQuery = true)
    Items findItemById(int id);
}
