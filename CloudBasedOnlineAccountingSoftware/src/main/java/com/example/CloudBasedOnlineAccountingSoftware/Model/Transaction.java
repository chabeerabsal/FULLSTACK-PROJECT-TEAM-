package com.example.CloudBasedOnlineAccountingSoftware.Model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // credit or debit
    private Double amount;
    private LocalDateTime date = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}