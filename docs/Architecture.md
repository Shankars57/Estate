🧠 Architecture Explanation (Simple & Clear)
🔹 Overview

EstateHub follows a 3-Tier Architecture designed for scalability, security, and real-time performance.

1️⃣ Presentation Layer (Frontend)

Tech: React.js + Tailwind CSS
Responsibilities:

Property browsing & search

Add property form (image upload)

Book visit modal

User authentication (JWT)

Responsive UI (mobile + desktop)

Key Tools:

Axios for API calls

Zustand for state management

React Router for navigation

📌 Runs entirely in the browser and communicates with backend via HTTPS.

2️⃣ Application Layer (Backend API)

Tech: Node.js + Express.js

Responsibilities:

REST APIs for:

Authentication

Listings

Bookings

JWT-based route protection

Image upload handling (Multer)

Business logic & validation

Key APIs:

/api/auth/\*

/api/listings/\*

/api/bookings/\*

📌 Acts as the central brain of the system.

3️⃣ Data & Cloud Services Layer

MongoDB Atlas

Stores users, listings, bookings

Cloud-hosted & scalable

ImageKit

Handles property image uploads

Optimized CDN delivery

Reduces backend load

📌 Ensures reliability, performance, and scalability.

🔄 Request Flow (End-to-End)
User → React UI
→ Axios API Request
→ Express Server
→ JWT Middleware
→ MongoDB / ImageKit
→ Response
→ UI Update

📘 README.md – Architecture Section (Copy-Paste)

## 🏗️ System Architecture

EstateHub uses a modern 3-tier architecture:

### Frontend (React.js)

- Handles UI, search, booking forms
- Responsive across devices
- Communicates via REST APIs

### Backend (Node.js + Express)

- Manages authentication, listings, bookings
- Uses JWT for security
- Handles image uploads using Multer

### Cloud Services

- MongoDB Atlas for database
- ImageKit for image storage & CDN
- Deployed on cloud platforms like AWS / Vercel / Render

This architecture ensures scalability, security, and real-time booking performance.
