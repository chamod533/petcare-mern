# 🐾 PetCare – MERN E-Commerce Web App

PetCare is a full-featured e-commerce application designed for selling pet products such as food, accessories, toys, collars, and more. This project is built using the **MERN stack (MongoDB, Express.js, React, Node.js)** and simulates a complete real-world online store with both customer and admin functionalities.

---

## ✨ Features

### ⭐ User Features

* Browse products by category
* Product search, filters & sorting
* Product details page
* Add items to shopping cart
* Checkout & online payments (Stripe)
* Create account / Login (JWT auth)
* View and track orders
* Leave ratings & reviews

### 🛠️ Admin Features

* Add new products
* Edit existing products
* Delete products
* View & manage orders
* Update order status

### 📄 Additional Pages

* About Us
* Contact Us (saved to database)

---

## 🧰 Tech Stack

### Frontend

* React.js
* Axios
* React Router
* CSS / Tailwind / Bootstrap (optional)

### Backend

* Node.js
* Express.js
* JWT Authentication
* Stripe Payments

### Database

* MongoDB + Mongoose

### Tools

* Git & GitHub
* Nodemon for development
* Postman for API testing

---


## ⚙️ Environment Variables

Create `.env` file in `/backend`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PORT=5000
```

---

## ▶️ Running the App

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm start
```

---

## 🧪 Seeding Sample Products

To insert sample products into MongoDB:

```bash
node seed.js
```

This will populate default categories and products.

---

## 📦 Folder Structure

```
petcare-mern/
 ├── backend/
 │   ├── models/
 │   ├── routes/
 │   ├── controllers/
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   ├── components/
 │   └── pages/
 └── README.md
```

---

## 💡 Attributions

This project was created as a professional MERN stack learning and portfolio project demonstrating:

* CRUD operations
* Authentication & authorization
* Payment gateway integration
* ADMIN dashboards
* Full-stack deployment

---


