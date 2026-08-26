<div align="center">

# ⚡ TECHSPHERE
### *Precision Hardware for the Next Era*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

<p align="center">
  <b>A high-performance, full-stack spatial computing & hardware showcase built with MERN, Tailwind CSS, GSAP, and advanced Data Structures & Algorithms.</b>
</p>

---

</div>

## 🌌 Overview

**TechSphere** is an ultra-fast, luxury spatial hardware website engineered for the next era of computing. Featuring a sleek **monochromatic white & gray metallic aesthetic**, dark frosted glassmorphism, hardware-accelerated video background layers, and real-time interactive product telemetry.

---

## ✨ Key Features & Innovations

- **🚀 60 FPS Hardware-Accelerated Stage**: Static background video with a custom **cut-free seamless boomerang loop** (`/hero_boomerang.mp4`) promoted to dedicated GPU composite layers.
- **💎 Pure White & Gray Metallic Theme**: Monochromatic precision design language (`#ffffff`, `#d4d4d4`, `#a7a6a6`) with dark frosted glass cards (`backdrop-blur-md`).
- **🔍 O(K) Trie Prefix Product Search**: Instant auto-complete search algorithm powered by a custom **ProductTrie** data structure.
- **🛒 O(1) Hash Map Shopping Bag**: Constant-time cart state operations (`Map<ProductId, CartItem>`) with slide-over drawer and checkout requisition modal.
- **📍 Precise Scrollspy Navigation**: Position-based scroll detection highlighting active sections in real-time with glowing white indicators.
- **🖥️ SphereOS UNIX Terminal Simulator**: Interactive hardware kernel status simulator displaying real-time system metrics.
- **🛡️ Enterprise Security**: Protected via **Helmet.js**, Express rate limiting, input sanitization against MongoDB operator injection, and strict CORS policies.

---

## 📐 Architecture: DSA & OOP Patterns

| Category | Implementation | Description |
| :--- | :--- | :--- |
| **Data Structure** | **Prefix Trie (`ProductTrie.js`)** | Delivers $O(K)$ search time complexity where $K$ is keyword length. |
| **Data Structure** | **Hash Map Cart (`cartOperations.js`)** | Provides $O(1)$ constant time complexity for item insertion, lookup, and deletion. |
| **Data Structure** | **LRU In-Memory Cache (`CacheManager.js`)** | Serves cached API queries in $O(1)$ without repetitive database hits. |
| **OOP Pattern** | **Singleton (`DatabaseService.js`)** | Maintains a single persistent MongoDB connection pool across server lifecycle. |
| **OOP Pattern** | **Layered Controller-Service-Repository** | Encapsulates business logic into `ProductService`, `OrderService`, and `NewsletterService`. |
| **OOP Pattern** | **Factory Pattern (`ApiResponse.js`)** | Standardizes all API JSON response payloads. |

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (Custom Dark Glassmorphism tokens)
- **Animations**: GSAP (GreenSock Animation Platform) & CSS 3D Transforms
- **Icons**: Lucide React Icons
- **HTTP Client**: Axios

### **Backend**
- **Runtime**: Node.js v22+
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet.js, Express Rate Limit, Input Sanitizer
- **Performance**: Brotli / Gzip Compression

---

## 📁 Repository Directory Tree

```
TECHSPHARE/
├── 📄 convert_hero_video.py  # Python FFmpeg Boomerang Generator
├── 📄 design.html            # Original Design Reference
├── 📄 styles.css             # Original CSS Tokens Reference
├── 📄 app.js                 # Original JS Engine Reference
├── 📁 server/                # Node.js & Express API Server
│   ├── 📄 server.js          # Server Entrypoint & Middleware Setup
│   ├── 📄 seed.js            # Database Seeder Script
│   ├── 📁 config/            # DatabaseService (Singleton)
│   ├── 📁 controllers/       # ProductController, OrderController, NewsletterController
│   ├── 📁 middleware/        # Rate Limiters & Input Sanitizer
│   ├── 📁 models/            # Product, Order, Subscriber Mongoose Schemas
│   ├── 📁 routes/            # Express API Endpoint Routers
│   ├── 📁 services/          # Business Logic Services
│   └── 📁 utils/             # ApiResponse (Factory), CacheManager (LRU), ProductTrie (Trie)
└── 📁 client/                # React + Vite Frontend App
    ├── 📄 vite.config.js     # Vite Config & Proxy Setup
    ├── 📄 tailwind.config.js # Tailwind Design System Config
    ├── 📁 public/            # Static Assets (hero_boomerang.mp4)
    └── 📁 src/
        ├── 📄 App.jsx        # Main React App Wrapper
        ├── 📄 main.jsx       # DOM Mount Entrypoint
        ├── 📄 index.css      # Tailwind & Glassmorphism Utilities
        ├── 📁 components/    # Navbar, Hero, Catalog, ProductModal, CartDrawer, etc.
        ├── 📁 context/       # CartContext (Map-based State Manager)
        ├── 📁 services/      # API Integration Client
        └── 📁 utils/        # CartMapManager (O(1) Operations)
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Optional: App falls back to high-speed in-memory store if offline)

### 1. Installation

Clone the repository and install dependencies for both server and client:

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/techsphere.git
cd techsphere

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../client
npm install
```

### 2. Environment Setup

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/techsphere
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Database Seeding (Optional)

Populate MongoDB with the 6 flagship hardware products:

```bash
cd server
npm run seed
```

### 4. Running Local Development Environment

Launch both backend and frontend servers in separate terminals:

```bash
# Terminal 1: Backend Server (Port 5000)
cd server
npm start

# Terminal 2: Frontend Client (Port 5173)
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Rate Limit |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch hardware items (Supports `?category=` & `?search=`) | 300 / 15 min |
| `GET` | `/api/products/:id` | Fetch specific hardware specs by product ID | 300 / 15 min |
| `POST` | `/api/orders` | Submit hardware purchase requisition | 20 / 15 min |
| `POST` | `/api/newsletter` | Join early access waitlist | 10 / 15 min |
| `GET` | `/api/health` | System telemetry & database connection status | 300 / 15 min |

---

## 🛡️ Security & Performance Standards

- **HTTP Security Headers**: Enforced via **Helmet.js** to mitigate XSS, clickjacking, and MIME-sniffing.
- **Injection Protection**: Input sanitizer strips MongoDB query operators (`$gt`, `$ne`, etc.) from incoming request payloads.
- **Hardware Acceleration**: `transform: translateZ(0)` and `will-change: transform` promote key scrolling elements to discrete GPU composite layers.

---

<div align="center">

### 🌐 Built with Precision for the Next Era

© 2026 TechSphere Systems Inc. All rights reserved.

</div>
