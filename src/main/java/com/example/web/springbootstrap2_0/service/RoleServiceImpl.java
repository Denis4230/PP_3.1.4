package com.example.web.springbootstrap2_0.service;

import com.example.web.springbootstrap2_0.model.Role;
import com.example.web.springbootstrap2_0.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
@Service
public class RoleServiceImpl implements RoleService{

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public void nawRole(Role role) {
        roleRepository.save(role);
    }
}
