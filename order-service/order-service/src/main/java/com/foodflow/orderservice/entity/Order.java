package com.foodflow.orderservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String items; // e.g., "Pizza, Coke"
    private Double price;

    // Status will change: ORDER_CREATED -> PAYMENT_COMPLETED -> CONFIRMED
    private String status;

    private LocalDateTime orderTime;
}