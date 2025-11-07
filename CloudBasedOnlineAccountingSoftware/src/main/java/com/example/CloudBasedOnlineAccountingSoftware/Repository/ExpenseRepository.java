package com.example.CloudBasedOnlineAccountingSoftware.Repository;

import com.example.CloudBasedOnlineAccountingSoftware.Model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}