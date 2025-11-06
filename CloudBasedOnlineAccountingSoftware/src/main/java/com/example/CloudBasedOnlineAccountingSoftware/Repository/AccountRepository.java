package com.example.CloudBasedOnlineAccountingSoftware.Repository;

import com.example.CloudBasedOnlineAccountingSoftware.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<Account, Long> {}
