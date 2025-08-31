# 📝 Task Management System - Backend

A Node.js + Express + MongoDB backend for managing users, authentication, and tasks.  
Includes JWT authentication, Socket.IO real-time updates, soft delete, and Swagger API documentation.  

---

## 🚀 Features

- User Registration, Update, Delete
- JWT Authentication (`x-auth-token` header)
- Login & Logout with Login History tracking
- Task CRUD with due dates & status
- Soft delete for Users & Tasks
- Real-time task updates via Socket.IO (`manageTask` event)
- Centralized error handling
- Swagger API Documentation (`/api-docs`)

---

## 📂 Project Structure

├── controllers/ # Business logic (user, auth, task)
├── middlewares/ # Auth, validation, error handling
├── models/ # Mongoose schemas (User, Task, LoginHistory)
├── routes/ # Express routes
├── services/ # Socket.IO, DB connection
├── validations/ # Joi validation schemas
├── swagger/ # Swagger specs (auth, users, tasks)
├── start/ # Entry points & route loader
└── app.js / server.js # App bootstrap



---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/PrabhatM101/tms-backend.git
cd tms-backend

# Install dependencies
npm install

# Run server
npm start


API Documentation : http://localhost:3000/api-docs