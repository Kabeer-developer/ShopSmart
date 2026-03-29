# 🛒 ShopSmart — Full-Stack E-Commerce Platform

> A fully functional e-commerce web application built with the MERN stack, featuring real-world capabilities like product discovery, secure authentication, cart management, order tracking, and an admin dashboard.

**🔗 Live Demo:** [shopsmart-frontend-2xju.vercel.app](https://shopsmart-frontend-2xju.vercel.app)

---

## 📌 Table of Contents

- [Product Overview](#-product-overview)
- [Key Features](#-key-features)
- [User Flow](#-user-flow)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧾 Product Overview

**ShopSmart** is a full-stack e-commerce platform that replicates the core experience of modern online shopping. Users can browse a product catalog, filter by category or price, manage a cart, and track their orders — all within a clean, responsive interface.

The project was built end-to-end as a portfolio piece to demonstrate real-world MERN stack development, including REST API design, JWT-based authentication, MongoDB data modeling, and protected admin workflows.

---

## ✨ Key Features

| Feature                  | Description                                                        |
|--------------------------|--------------------------------------------------------------------|
| 🔐 User Authentication   | Secure register/login with JWT tokens and protected routes         |
| 🔍 Product Search & Filters | Search by keyword; filter by category, price range, and rating  |
| 🛒 Cart & Checkout       | Persistent cart with quantity controls and order summary           |
| 📦 Order Tracking        | Users can view order history and live order status updates         |
| 🛠️ Admin Dashboard       | Admins can manage products, view all orders, and update statuses   |

---

## 🧭 User Flow

```
Landing Page
    │
    ├── Browse / Search Products
    │       └── Apply Filters (Category, Price, Rating)
    │
    ├── View Product Details
    │       └── Add to Cart
    │
    ├── Register / Login
    │       └── JWT Token issued & stored
    │
    ├── Cart → Checkout
    │       └── Order placed & saved to DB
    │
    └── My Orders
            └── Track order status (Processing → Shipped → Delivered)

Admin Flow:
    Login (admin role) → Dashboard → Manage Products / View & Update Orders
```

---

## 🛠 Tech Stack

### Frontend
| Tool            | Purpose                            |
|-----------------|------------------------------------|
| React.js        | Component-based UI                 |
| React Router    | Client-side routing                |
| Context API     | Global cart & auth state           |
| Axios           | HTTP requests to the backend       |
| Tailwind CSS / CSS Modules | Styling               |

### Backend
| Tool            | Purpose                            |
|-----------------|------------------------------------|
| Node.js         | JavaScript runtime                 |
| Express.js      | REST API framework                 |
| MongoDB         | NoSQL database for products/orders |
| Mongoose        | ODM for schema modeling            |
| JWT             | Stateless authentication           |
| bcrypt.js       | Password hashing                   |

### Infrastructure
| Tool            | Purpose                            |
|-----------------|------------------------------------|
| Vercel          | Frontend deployment                |
| MongoDB Atlas   | Cloud-hosted database              |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────┐
│              React Frontend              │
│  (Vercel — shopsmart-frontend.vercel.app)│
└──────────────────┬───────────────────────┘
                   │  REST API (JSON over HTTP)
                   ▼
┌──────────────────────────────────────────┐
│         Node.js / Express Backend        │
│         Handles Auth, Products, Orders   │
└──────────────────┬───────────────────────┘
                   │  Mongoose ODM
                   ▼
┌──────────────────────────────────────────┐
│           MongoDB Atlas (Cloud)          │
│   Collections: users, products, orders  │
└──────────────────────────────────────────┘
```

**Key design decisions:**
- **JWT stored in `localStorage`** with role-based access (`user` / `admin`) decoded on the client
- **Middleware-protected routes** on the backend (`authMiddleware`, `adminMiddleware`)
- **Mongoose schemas** enforce data integrity for products, users, and orders
- Frontend is fully **decoupled** from the backend — can swap APIs without UI changes

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopsmart.git
cd shopsmart
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` (see [Environment Variables](#-environment-variables)), then:

```bash
npm run dev
# Server runs at http://localhost:5000
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm start
# App runs at http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend — `/backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api
CLOUD_API_SECRET=your_cloud_api_secret
```

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

---

## 📡 API Reference

All API routes are prefixed with `/api`.

### Auth Routes — `/api/auth`

| Method | Endpoint       | Description              | Auth Required |
|--------|----------------|--------------------------|---------------|
| POST   | `/register`    | Register a new user      | ❌            |
| POST   | `/login`       | Login & receive JWT      | ❌            |
| GET    | `/profile`          | Get logged-in user info  | ✅ User       |

---

## 📁 Folder Structure

```
shopsmart/
├── frontend/
│   └── src/
│       ├── components/        # Reusable UI components (Navbar, ProductCard, etc.)
│       ├── pages/             # Route-level pages (Home, Login, Cart, Orders)
│       ├── redux/       
│       ├── services/          # Axios instance, helpers
│       └── App.js
│
├── backend/
│   ├── controllers/           # Route handler logic
│   ├── middleware/            # auth, admin, error handlers
│   ├── models/                # Mongoose schemas (User, Product, Order)
│   ├── routes/                # Express route definitions
│   ├── config/                # DB connection
│   └── server.js
│
└── README.md
```
---

## 🤝 Contributing

Contributions and suggestions are welcome!

```bash
# 1. Fork this repo
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature"

# 4. Push to the branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please follow conventional commit messages (`feat:`, `fix:`, `docs:`, `chore:`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ using the MERN Stack &nbsp;|&nbsp; 
  <a href="https://shopsmart-frontend-2xju.vercel.app">Live Demo</a>
</div>