package com.example.CloudBasedOnlineAccountingSoftware.Model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientName;
    private String clientEmail;
    private Double amount;
    private String status; // e.g., "PAID", "UNPAID", "OVERDUE"
    private LocalDate issueDate;
    private LocalDate dueDate;

    // Constructors
    public Invoice() {}

    public Invoice(String clientName, String clientEmail, Double amount, String status, LocalDate issueDate, LocalDate dueDate) {
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.amount = amount;
        this.status = status;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
}

