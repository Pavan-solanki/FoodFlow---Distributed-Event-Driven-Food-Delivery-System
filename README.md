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
```
## 🚀 Key Features

- ⚡ **Event-Driven Architecture** — Kafka decouples services for massive scalability.
- 🔄 **Real-Time Bi-Directional Updates** — WebSockets deliver sub-50ms order tracking.
- 🛡 **Circuit Breakers & Fallbacks** — Resilience4j ensures fault tolerance.
- 💳 **Distributed Transactions (Saga Pattern)** — Handles success + compensating flows.
- 🌐 **API Gateway Abstraction** — Frontend interacts only via port `8080`.
- 🔍 **Observability** — Micrometer + Zipkin for distributed tracing.

---

## 💡 Saga Lifecycle

Success Path: Order Placed → Wallet Deducted → Inventory Reserved → Order Confirmed
Failure Path: Order Placed → Insufficient Funds → Compensating Event → Order Cancelled


---

## 🛠️ Tech Stack

| Component | Technology |
|----------|------------|
| Backend | Java 17, Spring Boot 3.3 |
| Frontend | React.js, Redux Toolkit, Tailwind CSS, Vite |
| Message Broker | Apache Kafka (KRaft Mode) |
| Database | PostgreSQL |
| API Gateway | Spring Cloud Gateway |
| Real-Time | Spring WebSocket (STOMP), SockJS |
| Resilience | Resilience4j |
| Observability | Micrometer, Zipkin |
| Containerization | Docker, Docker Compose |

---

## 📸 Screenshots

| Screenshot | Example |
|-----------|---------|
<img width="1868" height="893" alt="Screenshot 2025-11-29 154319" src="https://github.com/user-attachments/assets/c9729b4f-9f95-4579-ab49-ec0eb7a7a803" />
<img width="1819" height="878" alt="Screenshot 2025-11-29 154334" src="https://github.com/user-attachments/assets/41f2f04f-3a22-41e0-82b6-ba898ed5633b" />
<img width="1869" height="869" alt="Screenshot 2025-11-29 154402" src="https://github.com/user-attachments/assets/f74e05d8-80d8-4534-aff1-07be73dcf37b" />



---

## 🏃 Getting Started Locally

### 📌 Prerequisites
- Java 17+
- Node.js & npm
- Docker Desktop running

---

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Pavan-solanki/FoodFlow.git
cd FoodFlow

2️⃣ Start Infrastructure (Kafka, Postgres, Zipkin)
docker-compose up -d


⏳ Wait 30 seconds for Kafka to initialize.

3️⃣ Start Microservices (in this order)
Service	Port
API Gateway	8080
Order Service	8081
Payment Service	8082
Inventory Service	8083

Run each Spring Boot app from your IDE.

4️⃣ Start Frontend
cd foodflow-frontend
npm install
npm run dev


Open in browser:

http://localhost:5173

🔗 API & WebSocket Endpoints
Service	Method	Endpoint	Description
Gateway	POST	/orders	Place a new order
Gateway	GET	/orders/{id}	Get order status
Gateway	GET	/payments/wallet	Get wallet balance
Gateway	GET	/fallback/order	Circuit breaker fallback
WebSocket	WS	/ws	Real-time push notifications
👨‍💻 Author

Pavan Solanki — Full Stack Developer

⭐ If this project helped you, please consider starring the repo!
Made with ❤️ using Java, Spring Boot, Kafka & React
