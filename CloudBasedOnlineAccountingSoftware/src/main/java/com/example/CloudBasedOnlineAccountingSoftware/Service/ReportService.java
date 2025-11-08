package com.example.CloudBasedOnlineAccountingSoftware.Service;


import com.example.CloudBasedOnlineAccountingSoftware.Repository.ExpenseRepository;
import com.example.CloudBasedOnlineAccountingSoftware.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    // Total Sales (Sum of invoice amounts)
    public Double getTotalSales() {
        return invoiceRepository.findAll()
                .stream()
                .mapToDouble(i -> i.getAmount())
                .sum();
    }

    // Total Expenses
    public Double getTotalExpenses() {
        return expenseRepository.findAll()
                .stream()
                .mapToDouble(e -> e.getAmount())
                .sum();
    }

    // Profit or Loss
    public Double getProfitOrLoss() {
        return getTotalSales() - getTotalExpenses();
    }

    // Approx GST (assume 18%)
    public Double getGSTCollected() {
        return getTotalSales() * 0.18;
    }
}

