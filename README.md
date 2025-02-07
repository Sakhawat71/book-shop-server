# Book Shop B4A2V1

Book Shop API is a backend application built with TypeScript, Express.js, and MongoDB. It provides a RESTful API to manage books and customer orders. Features include CRUD operations for books, order processing, and revenue calculation.

## Features
- **CRUD Operations for Books**: Create, Read, Update, and Delete book records.
- **Order Management**: Place orders for books and manage inventory.
- **Revenue Calculation**: Calculate total revenue from orders using MongoDB aggregation.
- **Input Validation**: Ensures data integrity with Mongoose schema validation.
- **Error Handling**: Centralized error handling for better debugging.

## Technologies
- **TypeScript**: Strongly typed programming for scalability.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **dotenv**: Manage environment variables.

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sakhawat71/book-shop-server.git
cd book-shop-api
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Application
```bash
npm run start
```

#### live link : [live link](https://book-shop-server-71.vercel.app/)

## API Endpoints

### 1. Products (Books)
- **Create Book**: `POST /api/products`
- **Get All Books**: `GET /api/products`
- **Get Book by ID**: `GET /api/products/:id`
- **Update Book**: `PUT /api/products/:id`
- **Delete Book**: `DELETE /api/products/:id`

### 2. Orders
- **Create Order**: `POST /api/orders`
- **Get Total Revenue**: `GET /api/orders/revenue`

### 3. Auth
- **Log in**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`