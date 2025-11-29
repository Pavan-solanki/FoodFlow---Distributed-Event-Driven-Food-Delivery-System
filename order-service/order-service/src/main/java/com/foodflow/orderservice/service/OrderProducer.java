package com.foodflow.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    // We will send the topic name "new-orders"
    private static final String TOPIC = "new-orders";

    public void sendMessage(String message) {
        System.out.println("Producing message to Kafka: " + message);
        kafkaTemplate.send(TOPIC, message);
    }
}