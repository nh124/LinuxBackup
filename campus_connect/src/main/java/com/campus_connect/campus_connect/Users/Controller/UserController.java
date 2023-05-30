pacs_kage com.campus_connect.campus_connect.Users.Controller;

import com.campus_connect.campus_connect.Users.Dto.LoginDTO;
import com.campus_connect.campus_connect.Users.Dto.RegistrationDto;
import com.campus_connect.campus_connect.Users.Model.UsersEntity;
import com.campus_connect.campus_connect.Users.Repository.UserRepository;
import com.campus_connect.campus_connect.Users.Service.UnauthorizedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
//import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    UnauthorizedUserService unauthorizedUserService;

    @Autowired
    public UserController(UnauthorizedUserService unauthorizedUserService) {
        this.unauthorizedUserService = unauthorizedUserService;
    }


    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegistrationDto registrationDto){
        return unauthorizedUserService.register(registrationDto);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
        return unauthorizedUserService.Login(loginDTO);
    }

    @GetMapping("getUsers")
    public List<UsersEntity> getAllUsers(){
        return unauthorizedUserService.allUsers();
    }

    @PostMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        return unauthorizedUserService.deleteUser(id);
    }
}
