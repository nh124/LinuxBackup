package com.eCommerce.eCommerce.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private int id;

    @Column(name = "cart_name")
    private String cart_name;

    @OneToMany
    @JoinColumn(name = "cart_id")
    private Set<Items> listOfItems;

    @OneToOne()
    @JoinColumn(name = "user_id")
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCart_name() {
        return cart_name;
    }

    public void setCart_name(String cart_name) {
        this.cart_name = cart_name;
    }

    public Set<Items> getListOfItems() {
        return listOfItems;
    }

    public void setListOfItems(Set<Items> listOfItems) {
        this.listOfItems = listOfItems;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
