package com.eCommerce.eCommerce.Controller;

import com.eCommerce.eCommerce.Model.Items;
import com.eCommerce.eCommerce.Model.User;
import com.eCommerce.eCommerce.Service.ItemService;
import com.eCommerce.eCommerce.dto.ItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping("/addItems")
    public Items addItems(@RequestBody ItemRequest ItemRequest){
        return  itemService.addItems(ItemRequest);
    }

    @GetMapping("/getAllItems")
    public List<Items> getAllItems(){
        return itemService.getAllItems();
    }

    @DeleteMapping("/deleteItem/{id}")
    public String deleteItem(@PathVariable int id){
        return itemService.deleteItem(id);
    }
}
