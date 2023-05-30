package com.springJWT.SpringJWT.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
// When spring opens up it will use an object called userDetails. Spring security always requires the userDetails object.
// Everytime we have a user implement userDetailed services.
//creating an entity and implementing the userDetails services and extending User class will give the same result. this is because the user class already implements userDetails to spring security.
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    // The password word will create a lomboc getPassword function which will not require the userDetails to not return getPassword().
    private String pass;
    @Enumerated(EnumType.STRING) // original return 0,1,2
    private Roles role;
    //return a list of roles
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return pass;
    }
}
