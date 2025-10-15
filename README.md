# 🧩 Express.js Product API
A simple RESTful API built with **Express.js** that performs CRUD operations on products.

## 🚀 Setup
1. Clone the repository  
   git clone <your-repo-url>  
   cd <project-folder>

2. Install dependencies  
   npm install

3. Create a `.env` file  
   PORT=5000  
   API_KEY=mysecretkey

4. Run the server  
   npm start  
   Server runs on: http://localhost:5000

## 🔑 Authentication
Every request must include this header:  
x-api-key: mysecretkey

## 📦 API Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create new product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

## 🧰 Middleware
- **Logger** – Logs each request  
- **Auth** – Checks API key  
- **Error Handler** – Catches and returns errors  

## 🧪 Example Test (Postman)
Header:  
x-api-key: mysecretkey  

Body (POST example):  
{  
  "name": "Headphones",  
  "price": 250,  
  "category": "electronics",  
  "inStock": true  
}

