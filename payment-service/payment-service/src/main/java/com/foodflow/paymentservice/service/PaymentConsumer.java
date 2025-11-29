package com.foodflow.paymentservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
@Service
public class PaymentConsumer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private WalletService walletService; // Inject the service

    @KafkaListener(topics = "new-orders", groupId = "payment-group")
    public void consumeOrder(String orderMessage) {
        String[] parts = orderMessage.split(":");
        String orderId = parts[0];
        double price = Double.parseDouble(parts[1]);

        System.out.println("Processing Payment for Order #" + orderId + " Amount: $" + price);

        // USE THE SERVICE TO DEDUCT
        if (walletService.deductAmount(price)) {
            System.out.println("Payment Approved! Remaining: $" + walletService.getBalance());
            kafkaTemplate.send("payment-success", "Payment Verified: " + orderId);
        } else {
            System.out.println("Payment Failed! Balance: $" + walletService.getBalance());
            kafkaTemplate.send("payment-failed", orderId);
        }
    }
}