package com.eCommerce.eCommerce.Controller;

import com.eCommerce.eCommerce.Model.User;
import com.eCommerce.eCommerce.Service.UserService;
import com.eCommerce.eCommerce.dto.CartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    public UserService UserService;

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return UserService.addUser(user);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return UserService.getAllUsers();
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable int id){
        return UserService.deleteUser(id);
    }
}
