# 💰 Finance System Backend API

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

> A robust, scalable backend system for a Finance Dashboard. This API efficiently handles user management, role-based access control (RBAC), complex financial transaction tracking, and dynamic data aggregation for dashboard analytics.

---

## 📑 Table of Contents
* [✨ Key Features](#-key-features)
* [🛠️ Tech Stack](#️-tech-stack)
* [📂 Folder Structure](#-folder-structure)
* [🚀 Setup Process](#-setup-process)
* [📡 API Explanation](#-api-explanation)
* [🤔 Assumptions Made](#-assumptions-made)
* [⚖️ Tradeoffs Considered](#️-tradeoffs-considered)

---

## ✨ Key Features

* **📊 Advanced Financial Analytics:** Utilizes MongoDB Aggregation Pipelines to efficiently compute Total Income, Expenses, Net Balance, and Category-wise breakdowns.
* **🔐 Role-Based Access Control (RBAC):** Secure endpoints protected by JSON Web Tokens (JWT) supporting Admin, Analyst, and Viewer roles.
* **💸 Dynamic Transaction Filtering:** Flexible GET routes capable of complex filtering logic using Query Parameters (Type, Category, Date Ranges).

---

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JSON Web Token (JWT)

---

## 📂 Folder Structure

```text
Finance-System/
├── controllers/       # Business logic for handling requests 
├── init/              # Database initialization and seed scripts
├── models/            # Mongoose schemas (User, Transaction)
├── routes/            # Express route definitions 
├── utils/             # Error handling and helper functions
├── middlewares.js     # Custom middlewares (Auth, validation)
├── server.js          # Entry point of the application
└── package.json       # Project dependencies
```

## 🚀 Setup Process

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- Node.js installed
- MongoDB installed and running locally, or a MongoDB Atlas URI.

### Installation Steps

1. **Clone the repository:** <br>

   ```bash
   git clone https://github.com/mahul0902/Finance-System.git
   cd Finance-System
   ```
2. **Install NPM packages:** <br>

   ```bash
   npm install
   ```
3. **Set up Environment Variables** <br>
   Create a .env file in the root directory and add your configuration details:<br>
   ```bash
   SECRET=your_super_secret_jwt_key
   ```
   Replace database URL from your own database URL. <br>
5. **Start the Server:** <br>

   ```bash
   node server.js
   ```

## 📡 API Explanation
The backend provides several RESTful endpoints. Below is a high-level overview. <br>
1. **Users (Authentication)** <br>
  ```text
   POST /users/signup -> Register a new user (Admin access usually required). <br>
   POST /users/login -> Authenticate an existing user and receive a JWT. <br>
   GET /users/logout -> Logout the current user. <br>
   PUT /users/:id -> Makes any user status Active or Inactive. <br>
   DELETE /users/:id -> Removes the account of the user. <br>
  ```

2. **Transactions** <br>
  ```text
   GET /transactions -> Fetches all transactions. <br>
   POST /transactions -> Create a new transaction. <br>
   PUT /transactions/:id -> Updates the transaction. <br>
   DELETE /transactions/:id -> Removes the transaction. <br>
   GET /transactions/:catOrType -> Filters the transactions based on type or category. <br>
   GET /transactions/:catOrType/:startDate/:endDate -> Filters the transactions based on date and type or category. <br>
  ```

3. **Dashboard** <br>
  ```text
  GET /dashboard -> Fetches aggregated data (Total Income, Total Expenses, Net Balance) using MongoDB aggregation pipelines. <br>
  ```

## 🤔 Assumptions Made

During the development of this backend, the following assumptions were made:

* **Frontend Agnostic:** The API is designed to serve raw JSON data. It assumes the client application (React, Vue, etc.) will handle all UI rendering and data formatting.
* **Stateful Session Management:** The application relies on server-side sessions combined with `httpOnly` cookies for authentication, rather than stateless tokens. It assumes the frontend client supports and accepts cookies.
* **Data Scale:** The system assumes a moderate volume of transactions per user. Real-time MongoDB aggregations are used for analytics, assuming the data size does not yet necessitate a complex caching layer like Redis.

---

## ⚖️ Tradeoffs Considered

* **Real-time Aggregation vs. Caching:**
  * **Decision:** We chose to calculate dashboard summaries on the fly using MongoDB Aggregation Pipelines rather than storing pre-calculated totals.
  * **Tradeoff:** This ensures 100% data accuracy and simplifies the codebase (no need to update cached totals on every new transaction), but it may introduce slight latency as the dataset grows massively.

* **Monolithic Architecture vs. Microservices:**
  * **Decision:** The application is built as a monolithic Node.js/Express app.
  * **Tradeoff:** While microservices offer better independent scaling, a monolith was chosen to reduce deployment complexity and overhead for this specific domain's current scope.

* **Session Cookies vs. Stateless JWTs:**
  * **Decision:** Server-side sessions with cookies were selected over stateless JWTs.
  * **Tradeoff:** Session cookies allow for immediate and secure session invalidation (like forced logouts) directly from the server. However, it requires the server to store session data (in memory or a database), which makes horizontal scaling slightly more complex compared to a purely stateless architecture.
