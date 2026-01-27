# 🏡 EstateHub – Real Estate Booking Platform

EstateHub is a beginner-friendly **full-stack real estate web application** that allows users to browse properties, view detailed listings, and book property visits seamlessly. The platform is designed to reduce customer drop-offs by providing a smooth, responsive, and reliable booking experience across devices.

---

## Live Links

FrontEnd :- https://estate-sandy-ten.vercel.app/

Backend :- https://estate-1-bcl8.onrender.com

Github :- https://github.com/Shankars57/Estate.git

## 🚀 Features

### 👤 User Features
- Browse real estate listings with images and details
- Search and filter properties by city and location
- View detailed property information
- Book property visits
- Login / Signup with JWT authentication
- Continue as guest (limited access)

### 🏢 Admin / Realtor Features
- Add new property listings with image upload
- Upload images securely using ImageKit
- Manage listings (future scope: edit & delete)

### 🌐 General
- Fully responsive (desktop & mobile)
- Smooth animations using Framer Motion
- Toast notifications for actions (success/error)
- Secure API with JWT
- Cloud-ready architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Zustand (state management)
- Axios
- Framer Motion
- React Hot Toast
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Atlas / Local)
- Mongoose
- Multer (file handling)
- ImageKit.io (image storage)
- JSON Web Token (JWT)
- bcryptjs

---

## 📁 Project Structure

### Frontend
src/
├── api/axios.js
├── assets/
├── components/
├── context/
├── pages/
├── store/
├── App.jsx
└── main.jsx


### Backend


backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js
└── .env


---

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/estatehub
JWT_SECRET=estatehub_jwt_secret_key

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

Frontend .env
VITE_BACKEND=http://localhost:5000/api

▶️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/Shankars57/Estate.git
cd Estate

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

📡 API Endpoints
Auth

POST /api/auth/register

POST /api/auth/login

Listings

GET /api/listings

GET /api/listings/:id

POST /api/listings (Protected)

🧠 Architecture Highlights

Zustand used for scalable state management

Axios interceptors for JWT handling

Multer + ImageKit for secure image uploads

Context + Store separation for clean code

Schema-level validation using Mongoose

📈 Future Enhancements

Edit & delete listings

Booking confirmation emails

Admin dashboard

Role-based access (Admin / User)

Payment gateway integration

Analytics dashboard

🎯 Use Case

This project is ideal for:

Internship submissions

Hackathons

Full-stack learning

Portfolio showcase

Campus placements

👨‍💻 Author

Bonam Chandra Durga Gowri Shankar
B.Tech (2026) – Full Stack Developer
Focused on MERN Stack & Scalable Web Applications



