package com.foodflow.orderservice.controller;

import com.foodflow.orderservice.entity.Order;
import com.foodflow.orderservice.repository.OrderRepository;
import com.foodflow.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
//@CrossOrigin(origins = "*") // ALLOWS REACT TO CONNECT
public class OrderController {

    @Autowired
    private OrderService service;

    @Autowired
    private OrderRepository repository;

    // 1. Create Order
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return service.placeOrder(order);
    }

    // 2. Get Order Status (New!)
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }
}