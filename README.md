# 🍔 FoodFlow — Distributed Event-Driven Food Delivery System

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Kafka](https://img.shields.io/badge/Apache_Kafka-Event_Driven-black?style=for-the-badge&logo=apachekafka)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

> A high-performance **microservices ecosystem** simulating a real-time food delivery platform with distributed event orchestration, circuit breakers, and WebSocket-powered live updates.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User(User / React App) -->|HTTP / WebSocket| Gateway[API Gateway - 8080]
    
    subgraph "Secure Internal Network"
        Gateway -->|/orders| Order[Order Service - 8081]
        Gateway -->|/payment| Payment[Payment Service - 8082]
        Gateway -->|/inventory| Inventory[Inventory Service - 8083]

        Order -->|📤 Produce Event| Kafka{Apache Kafka}
        Kafka -->|📥 Consume Event| Payment
        Payment -->|📤 Produce Event| Kafka
        Kafka -->|📥 Consume Event| Inventory
        Inventory -->|📤 Inventory Updated| Kafka
        Kafka -->|Order Confirmed| Order
    end

    Order -.->|Push Updates| User
    Gateway -->|Fail Fast| Resilience[Resilience4j Circuit Breaker Fallback]


## 🚀 Key Features

⚡ Event-Driven Architecture — Kafka decouples services for massive scalability.

🔄 Real-Time Bi-Directional Updates — WebSockets deliver sub-50ms order status changes.

🛡 Circuit Breakers & Fallbacks — Resilience4j ensures fault tolerance.

💳 Distributed Transactions (Saga Pattern) — Handles success + compensating flows.

🌐 API Gateway Abstraction — Frontend talks only to :8080.

🔍 Observability — Micrometer + Zipkin for distributed tracing.
