# 🍔 FoodFlow - Distributed Event-Driven Food Delivery System

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Kafka](https://img.shields.io/badge/Apache_Kafka-Event_Driven-black?style=for-the-badge&logo=apachekafka)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

> **A high-performance microservices ecosystem simulating a real-time food delivery platform. Features asynchronous orchestration via Kafka, fault tolerance with Circuit Breakers, and live status tracking via WebSockets.**

---

## 🏗️ System Architecture

The system follows a **Decoupled Microservices Architecture**, ensuring high scalability and resilience.

```mermaid
graph TD
    User(User/React App) -->|HTTP/WebSocket| Gateway[API Gateway - Port 8080]
    
    subgraph "Secure Internal Network"
        Gateway -->|Route /orders| Order[Order Service - 8081]
        Gateway -->|Route /payment| Payment[Payment Service - 8082]
        Gateway -->|Route /inventory| Inventory[Inventory Service - 8083]
        
        Order -->|Produce Event| Kafka{Apache Kafka}
        Kafka -->|Consume Event| Payment
        Payment -->|Produce Event| Kafka
        Kafka -->|Consume Event| Inventory
        
        Inventory -->|Update Status| Kafka
        Kafka -->|Order Confirmed| Order
    end
    
    Order -.->|Push Update| User
    Gateway -->|Circuit Breaker Fallback| Resilience[Resilience4j Fallback]
🚀 Key Features⚡ Event-Driven ArchitectureUtilizes Apache Kafka to decouple services. The Order Service does not wait for Payment; it fires an event and moves on, handling thousands of requests per second.🔄 Real-Time Bi-Directional UpdatesReplaced traditional HTTP polling with Spring WebSockets (STOMP).The frontend receives "Kitchen Updates" instantly (sub-50ms latency) without refreshing the page.🛡️ Fault Tolerance & ResilienceImplemented Resilience4j Circuit Breakers in the API Gateway.If the Order Service is down, the system Fails Fast and serves a graceful fallback response instead of hanging or crashing.🌐 Centralized API GatewaySpring Cloud Gateway handles all routing, CORS security, and load balancing.The Frontend only talks to localhost:8080, abstracting the complexity of the backend mesh.💳 Distributed Transaction Management (Saga Pattern)Implemented a Choreography-based Saga to handle wallet transactions.If Payment fails (Insufficient Funds), a "Compensation Event" is fired to Rollback the order status to CANCELLED automatically.🛠️ Tech StackComponentTechnologyBackend FrameworkJava 17, Spring Boot 3.3FrontendReact.js, Redux Toolkit, Tailwind CSS, ViteMessaging BrokerApache Kafka (KRaft Mode)DatabasePostgreSQLGateway & SecuritySpring Cloud Gateway, CORS ConfigurationReal-TimeSpring WebSocket (STOMP), SockJSResilienceResilience4j (Circuit Breaker)ObservabilityMicrometer, Zipkin Distributed TracingContainerizationDocker, Docker Compose📸 Screenshots1. Real-Time Order Tracking (Stepper UI)(Add your screenshot of the Green "Order Confirmed" screen here)![Order Success](path/to/image.png)2. Distributed Tracing (Zipkin)(Add your screenshot of the Zipkin Waterfall graph here)![Zipkin Trace](path/to/image.png)🏃‍♂️ Getting Started LocallyPrerequisitesJava 17+Node.js & npmDocker Desktop (Must be running)1. Clone the RepositoryBashgit clone [https://github.com/Pavan-solanki/FoodFlow.git](https://github.com/Pavan-solanki/FoodFlow.git)
cd FoodFlow
2. Start Infrastructure (Kafka, Postgres, Zipkin)Bashdocker-compose up -d
3. Start MicroservicesRun these applications in your IDE (IntelliJ/Eclipse) in this order:ApiGatewayApplication (Port 8080)OrderServiceApplication (Port 8081)PaymentServiceApplication (Port 8082)InventoryServiceApplication (Port 8083)4. Start FrontendBashcd foodflow-frontend
npm install
npm run dev
Access the app at http://localhost:5173🔗 API EndpointsServiceMethodEndpointDescriptionGatewayPOST/ordersPlace a new orderGatewayGET/orders/{id}Get order statusGatewayGET/payments/walletCheck User Wallet BalanceWebSocketWS/wsReal-time connection👨‍💻 AuthorPavan Solanki Full Stack Developer
