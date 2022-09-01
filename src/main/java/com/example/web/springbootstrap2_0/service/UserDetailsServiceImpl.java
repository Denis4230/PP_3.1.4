package com.example.web.springbootstrap2_0.service;


import com.example.web.springbootstrap2_0.model.Role;
import com.example.web.springbootstrap2_0.model.User;
import com.example.web.springbootstrap2_0.security.GrantedAuthorityImpl;
import com.example.web.springbootstrap2_0.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return buildUserDetails((User) userService.findByUserName(username));
    }

    private UserDetailsImpl buildUserDetails(User user) {
        UserDetailsImpl userDetails = new UserDetailsImpl();
        userDetails.setUsername(user.getUsername());
        userDetails.setPassword(user.getPassword());
        userDetails.setGrantedAuthorities(buildAuthorities(user.getRoles()));
        return userDetails;
    }

    private Set<GrantedAuthority> buildAuthorities(Set<Role> roles) {
        return roles.stream()
                .map(role -> new GrantedAuthorityImpl(role.getRole()))
                .collect(Collectors.toSet());
    }
}
