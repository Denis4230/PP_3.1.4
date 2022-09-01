package com.example.web.springbootstrap2_0.service;

import com.example.web.springbootstrap2_0.model.User;

import java.util.List;

public interface UserService {
    public User findById(Long id);

    public List<User> findAll();

    public User saveUser(User user);

    public void deleteById(Long id);

    User findByUserName(String username);
}
