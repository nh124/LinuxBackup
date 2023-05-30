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
public class UserService {
    @Autowired
    UserRepository UserRepository;

    @Autowired
    CartRepository cartRepository;

    public User addUser(User user){
        return UserRepository.save(user);
    }
    public List<User> getAllUsers(){
        return UserRepository.findAll();
    }

    public String deleteUser(@PathVariable int id){
        if(!UserRepository.existsById(id)){
            return "user with id " + id + " does not exist";
        }
        UserRepository.deleteById(id);
        return "user with id " + id + " has been deleted";
    }
}
