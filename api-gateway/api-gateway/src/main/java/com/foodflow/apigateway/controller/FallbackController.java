package com.foodflow.apigateway.controller;

import org.springframework.web.bind.annotation.RequestMapping; // Import this
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class FallbackController {

    // Changed from @GetMapping to @RequestMapping to handle POST requests too
    @RequestMapping("/fallback/order")
    public Mono<String> orderFallback() {
        return Mono.just("{\"status\": \"DOWN\", \"message\": \"Order Service is currently unavailable. Please try again later.\"}");
    }

    @RequestMapping("/fallback/payment")
    public Mono<String> paymentFallback() {
        return Mono.just("{\"status\": \"DOWN\", \"message\": \"Payment Service is unavailable.\"}");
    }

    @RequestMapping("/fallback/inventory")
    public Mono<String> inventoryFallback() {
        return Mono.just("{\"status\": \"DOWN\", \"message\": \"Inventory Service is unavailable.\"}");
    }
}