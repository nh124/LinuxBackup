package com.eCommerce.eCommerce.Service;

import com.eCommerce.eCommerce.Model.Cart;
import com.eCommerce.eCommerce.Model.Items;
import com.eCommerce.eCommerce.Repository.CartRepository;
import com.eCommerce.eCommerce.Repository.ItemRepository;
import com.eCommerce.eCommerce.dto.ItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CartRepository cartRepository;

    public Items addItems(@RequestBody ItemRequest itemRequest){
        Items item = new Items();
        Cart cart = cartRepository.findCartById(itemRequest.cart_id);
        item.setItem_name(itemRequest.item_name);
        item.setCart(cart);
        return itemRepository.save(item);
    }

    public List<Items> getAllItems(){
        return itemRepository.findAll();
    }

    public String deleteItem(@PathVariable int id){
        Items item = itemRepository.findItemById(id);
        if(!itemRepository.existsById(id)){
            return "Item with " + id + " does not exist";
        }
        itemRepository.delete(item);
        return "Item with " + id + " has been deleted";
    }
}
