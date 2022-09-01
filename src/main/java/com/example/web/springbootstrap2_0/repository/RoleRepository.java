package com.example.web.springbootstrap2_0.repository;

import com.example.web.springbootstrap2_0.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
}
