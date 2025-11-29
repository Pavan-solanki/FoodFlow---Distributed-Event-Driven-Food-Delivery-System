package com.foodflow.orderservice.service;

import com.foodflow.orderservice.entity.Order;
import com.foodflow.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate; // IMPORT THIS
import org.springframework.stereotype.Service;

@Service
public class OrderConsumer {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // The WebSocket Broadcaster

    @KafkaListener(topics = "order-ready", groupId = "order-group")
    public void completeOrder(String message) {
        // 1. Extract ID
        String idString = message.replaceAll("\\D+", "");
        Long orderId = Long.parseLong(idString);

        // 2. Update Database
        Order order = repository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus("CONFIRMED");
            repository.save(order);
            System.out.println("Order #" + orderId + " confirmed.");

            // 3. PUSH Real-Time Update to Frontend!
            // We send the order object to anyone listening to "/topic/orders/{id}"
            messagingTemplate.convertAndSend("/topic/orders/" + orderId, order);
        }
    }
    @KafkaListener(topics = "payment-failed", groupId = "order-group")
    public void cancelOrder(String orderId) {
        System.out.println("Payment Failed for Order #" + orderId + ". Cancelling order.");

        Long id = Long.parseLong(orderId);
        Order order = repository.findById(id).orElse(null);

        if (order != null) {
            order.setStatus("CANCELLED");
            repository.save(order);

            // Notify Frontend via WebSocket
            messagingTemplate.convertAndSend("/topic/orders/" + id, order);
        }
    }
}