package com.example.CloudBasedOnlineAccountingSoftware.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountName;
    private Double balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
