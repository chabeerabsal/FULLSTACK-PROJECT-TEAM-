package com.example.CloudBasedOnlineAccountingSoftware.Repository;


import com.example.CloudBasedOnlineAccountingSoftware.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
