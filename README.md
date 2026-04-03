# 💰 Finance System Backend API

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A robust and scalable backend system for a Finance Dashboard built with **Node.js, Express, and MongoDB**. This API handles user management, role-based access control, complex financial transaction tracking, and dynamic data aggregation for dashboard analytics.

---

## ✨ Key Features

### 1. 📊 Advanced Financial Analytics & Aggregation
Instead of relying on the frontend to calculate totals, this system utilizes **MongoDB Aggregation Pipelines** to efficiently compute and return data in a single API call:
- **Total Income & Expenses**
- **Net Balance Calculation**
- **Category-wise break down** (Revenue, Payroll, Marketing, etc.)

### 2. 🔐 Role-Based Access Control (RBAC) & Authentication
Secure endpoints protected by JSON Web Tokens (JWT). The system supports different user roles:
- **Admin**: Full access to manage users, update system configurations, and override data.
- **Analyst**: Can view and create reports or data visualizations.
- **Viewer**: Read-only access to consume dashboard metrics.
- *Includes an active/inactive toggle system for secure user lifecycle management.*

### 3. 💸 Dynamic Transaction Filtering
Highly flexible `GET` routes capable of complex filtering logic using Query Parameters, ensuring the frontend dashboard can drill down into specific data segments:
- Filter by **Type** (`income` or `expense`)
- Filter by **Category** (e.g., `Marketing`, `Payroll`)
- Filter by **Date Ranges** (Support for customized start and end dates)

---

## 🛠️ Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Environment Management:** dotenv

---

## 📂 Folder Structure

```text
Finance-System/
├── controllers/       # Business logic for handling requests (Transactions, Users)
├── init/              # Database initialization and seed data scripts
├── middlewares.js     # Custom middlewares (e.g., Auth verification, isActive checks)
├── models/            # Mongoose schemas (User, Transaction)
├── routes/            # Express route definitions 
├── utils/             # Error handling classes (ExpressError) and helper functions
├── server.js          # Entry point of the application
└── package.json       # Project dependencies and scripts
