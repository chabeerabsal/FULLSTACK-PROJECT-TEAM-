package com.example.CloudBasedOnlineAccountingSoftware.Repository;

import com.example.CloudBasedOnlineAccountingSoftware.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {}
