package com.example.web.springbootstrap2_0.configs;

import com.example.web.springbootstrap2_0.model.Role;
import com.example.web.springbootstrap2_0.model.User;
import com.example.web.springbootstrap2_0.service.RoleService;
import com.example.web.springbootstrap2_0.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class RegisterDB {

    private final RoleService roleService;

    private final UserService userService;

    @Autowired
    public RegisterDB(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }
    @PostConstruct
    public void start() {
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        roleService.nawRole(admin);
        roleService.nawRole(user);
        Set<Role> adminRole = new HashSet<>();
        adminRole.add(admin);
        User admin88 = new User("admin", 11, "admin", "admin", "admin", adminRole);
        userService.saveUser(admin88);
    }

}
