package com.foodflow.inventoryservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class InventoryConsumer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @KafkaListener(topics = "payment-success", groupId = "inventory-group")
    public void updateInventory(String paymentMessage) {
        System.out.println("Inventory Service Received: " + paymentMessage);

        // Mock Inventory Logic
        System.out.println(">> Deducting Stock... Stock Updated!");

        // Send success message back to Order Service
        // We pass the message along so Order Service can extract the ID
        kafkaTemplate.send("order-ready", paymentMessage);
    }
}