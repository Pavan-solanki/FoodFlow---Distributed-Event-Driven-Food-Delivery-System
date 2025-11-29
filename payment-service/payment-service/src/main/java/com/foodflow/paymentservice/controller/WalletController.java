package com.foodflow.paymentservice.controller;

import com.foodflow.paymentservice.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping
    public double getWalletBalance() {
        return walletService.getBalance();
    }
}