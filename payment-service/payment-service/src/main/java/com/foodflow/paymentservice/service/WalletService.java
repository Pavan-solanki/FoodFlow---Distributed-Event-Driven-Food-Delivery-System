package com.foodflow.paymentservice.service;

import org.springframework.stereotype.Service;

@Service
public class WalletService {

    // Hardcoded Balance (In real life, this comes from a DB)
    private double balance = 20.00;

    public double getBalance() {
        return balance;
    }

    public boolean deductAmount(double amount) {
        if (balance >= amount) {
            balance -= amount;
            return true; // Success
        }
        return false; // Failed
    }
}