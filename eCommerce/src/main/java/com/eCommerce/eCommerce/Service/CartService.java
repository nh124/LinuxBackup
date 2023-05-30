package com.eCommerce.eCommerce.Service;

import com.eCommerce.eCommerce.Model.Cart;
import com.eCommerce.eCommerce.Model.User;
import com.eCommerce.eCommerce.Repository.CartRepository;
import com.eCommerce.eCommerce.Repository.UserRepository;
import com.eCommerce.eCommerce.dto.CartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    UserRepository userRepository;

    public Cart addCart(CartRequest cartRequest){
        User user = userRepository.findUserById(cartRequest.user_id);
        Cart cart = new Cart();
        cart.setCart_name(cartRequest.cart_name);
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCarts(){
        return cartRepository.findAll();
    }

    public String deleteCart(@PathVariable int id){
        if(!cartRepository.existsById(id)){
            return "Cart with id " + id + "does not exist";

        }
        cartRepository.deleteById(id);
        return "Cart with id " + id + "has been deleted";
    }
}

