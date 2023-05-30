package com.eCommerce.eCommerce.Controller;

import com.eCommerce.eCommerce.Model.Cart;
import com.eCommerce.eCommerce.Service.CartService;
import com.eCommerce.eCommerce.dto.CartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    CartService CartService;

    @PostMapping("/addCart")
    public Cart addCart(@RequestBody CartRequest cartRequest){
        return CartService.addCart(cartRequest);
    }

    @GetMapping("/getAllCarts")
    public List<Cart> getAllCarts(){
        return CartService.getAllCarts();
    }

    @DeleteMapping("/deleteCart/{id}")
    public String deleteCart(@PathVariable int id){
        return CartService.deleteCart(id);
    }
}
