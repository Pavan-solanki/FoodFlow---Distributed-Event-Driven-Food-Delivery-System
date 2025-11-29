package com.foodflow.orderservice.service;

import com.foodflow.orderservice.entity.Order;
import com.foodflow.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private OrderProducer producer;

    public Order placeOrder(Order order) {
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("ORDER_CREATED");
        Order savedOrder = repository.save(order);

        // SEND ID AND PRICE (Format: "17:15.99")
        String message = savedOrder.getId() + ":" + savedOrder.getPrice();

        producer.sendMessage(message);

        return savedOrder;
    }
}