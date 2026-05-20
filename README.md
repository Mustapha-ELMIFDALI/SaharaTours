<div align="center">

<img src="enset_mohammedia.png" alt="ENSET Mohammedia" width="120"/>

# 🌍 SaharaTours

**A full-stack Moroccan tourism platform powered by AI**

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai)
![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API](#-api-documentation) • [Docker](#-docker-deployment) • [Team](#-team)

</div>

---

## 📖 Overview

**SaharaTours** is a modern, full-stack web application for discovering and booking authentic Moroccan tours.
It combines a robust **Spring Boot REST API** with a reactive **React + Vite** frontend, and integrates **OpenAI GPT-4o** to deliver AI-powered travel recommendations, a smart customer-support chatbot, automatic tour-description generation, and sentiment analysis on customer reviews.

---

## ✨ Features

### 🧳 Core Features
- 🔍 **Tour Discovery** — browse, search and filter tours by category, region, price and duration
- 📅 **Booking System** — real-time availability check, date selection and booking management
- 💳 **Online Payment** — secure checkout via Stripe integration
- ⭐ **Reviews & Ratings** — verified review system with AI sentiment analysis
- 📧 **Email Notifications** — automatic booking confirmation and reminder emails

### 🔐 Authentication & Security
- JWT-based authentication (access + refresh tokens)
- Role-based access control — `ROLE_USER` / `ROLE_ADMIN`
- Password encryption with BCrypt
- Stateless Spring Security configuration

### 🤖 AI Features (OpenAI GPT-4o)
- **AI Travel Recommendations** — personalised tour suggestions based on user preferences
- **AI Chatbot** — floating 24/7 customer-support widget
- **AI Description Generator** — one-click tour description writing in the admin panel
- **Sentiment Analysis** — automatic classification of customer reviews
- **AI Itinerary Builder** — multi-day travel plan generation on demand

### 🛠️ Admin Dashboard
- Full CRUD for tours, bookings and users
- Revenue analytics and booking statistics
- Image upload with Cloudinary CDN
- AI content generation tools

---

## 🏗️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Language |
| Spring Boot | 3.2 | Application framework |
| Spring Security | 6 | Auth & authorisation |
| Spring Data JPA | 3.2 | ORM / database access |
| MySQL | 8.0 | Relational database |
| JWT (jjwt) | 0.12 | Token-based auth |
| Stripe Java SDK | 24 | Payment processing |
| JavaMailSender | — | Email notifications |
| OpenAI Java SDK | — | AI integration |
| Maven | 3.9 | Build tool |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI library |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | 6 | Client-side routing |
| Axios | 1.6 | HTTP client |
| React Query | 5 | Server-state management |
| React Hook Form | 7 | Form handling & validation |
| Framer Motion | 11 | Animations |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerised deployment |
| Cloudinary | Image storage & CDN |
| OpenAI GPT-4o | AI features |
| Stripe | Payment gateway |

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 20+
- MySQL 8.0+
- Docker & Docker Compose *(optional)*
- An OpenAI API key
- A Stripe account (test keys are fine)

---

### 1 · Clone the repository

```bash
git clone https://github.com/Mustapha-ELMIFDALI/SaharaTours.git
cd SaharaTours
```

---

### 2 · Backend Setup

#### Create the database
```sql
CREATE DATABASE saharatours;
```

#### Configure environment variables

```yaml
# backend/src/main/resources/application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/saharatours
    username: YOUR_DB_USER
    password: YOUR_DB_PASSWORD
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

app:
  jwt:
    secret: YOUR_JWT_SECRET_MIN_32_CHARS
    expiration-ms: 86400000
    refresh-expiration-ms: 604800000

openai:
  api-key: YOUR_OPENAI_API_KEY
  model: gpt-4o

stripe:
  secret-key: sk_test_YOUR_STRIPE_SECRET_KEY
  webhook-secret: whsec_YOUR_WEBHOOK_SECRET

spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: YOUR_EMAIL@gmail.com
    password: YOUR_APP_PASSWORD

cloudinary:
  cloud-name: YOUR_CLOUD_NAME
  api-key: YOUR_CLOUDINARY_KEY
  api-secret: YOUR_CLOUDINARY_SECRET
```

#### Run the backend

```bash
cd backend
mvn spring-boot:run
```

> API available at **http://localhost:8080**

#### Seed sample data *(optional)*

```bash
mysql -u root -p saharatours < data_seed.sql
```

---

### 3 · Frontend Setup

```bash
cd frontend
cp .env.example .env.local
```

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY
```

```bash
npm install
npm run dev
```

> App available at **http://localhost:5173**

---

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Detached mode
docker-compose up -d --build

# Stop
docker-compose down
```

| Service | Port |
|---|---|
| Frontend (React) | `5173` |
| Backend (Spring Boot) | `8080` |
| MySQL | `3306` |

---

## 📡 API Documentation

Base URL: `http://localhost:8080/api`

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login and receive JWT |
| `POST` | `/auth/refresh` | ❌ | Refresh access token |
| `POST` | `/auth/logout` | ✅ | Invalidate refresh token |

### Tours
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/tours` | ❌ | List all tours (paginated) |
| `GET` | `/tours/{id}` | ❌ | Get tour by ID |
| `GET` | `/tours/search` | ❌ | Search & filter tours |
| `POST` | `/tours` | 🔑 ADMIN | Create a new tour |
| `PUT` | `/tours/{id}` | 🔑 ADMIN | Update a tour |
| `DELETE` | `/tours/{id}` | 🔑 ADMIN | Delete a tour |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/bookings/my` | ✅ | Get current user bookings |
| `POST` | `/bookings` | ✅ | Create a booking |
| `PUT` | `/bookings/{id}/cancel` | ✅ | Cancel a booking |
| `GET` | `/bookings` | 🔑 ADMIN | List all bookings |

### Reviews
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/reviews/tour/{tourId}` | ❌ | Get reviews for a tour |
| `POST` | `/reviews` | ✅ | Submit a review |
| `DELETE` | `/reviews/{id}` | 🔑 ADMIN | Delete a review |

### AI Endpoints
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/ai/chat` | ❌ | Chat with the AI assistant |
| `POST` | `/ai/recommend` | ✅ | Get personalised recommendations |
| `POST` | `/ai/generate-description` | 🔑 ADMIN | Generate tour description |
| `POST` | `/ai/itinerary` | ✅ | Build a multi-day itinerary |
| `GET` | `/ai/sentiment/{reviewId}` | 🔑 ADMIN | Analyse review sentiment |

---

## 🧪 Running Tests

```bash
# Backend
cd backend
mvn test

# Frontend
cd frontend
npm run test
```

---

## 📁 Project Structure

```
SaharaTours/
├── backend/
│   └── src/
│       ├── main/java/com/saharatours/
│       │   ├── auth/           # JWT, filters, AuthController
│       │   ├── user/           # User entity, service, controller
│       │   ├── tour/           # Tour entity, service, controller
│       │   ├── booking/        # Booking entity, service, controller
│       │   ├── review/         # Review entity, service, controller
│       │   ├── payment/        # Stripe integration
│       │   ├── email/          # JavaMail notification service
│       │   ├── ai/             # OpenAI integration & AI services
│       │   └── config/         # Security, CORS, exception handler
│       └── test/               # Unit & integration tests
├── frontend/
│   └── src/
│       ├── components/         # Navbar, Footer, TourCard, AIChatbot
│       ├── pages/              # HomePage, ToursPage, TourDetailPage ...
│       ├── context/            # AuthContext, ThemeContext
│       ├── hooks/              # useAuth, useTours, useBooking
│       ├── services/           # Axios API calls
│       └── utils/              # Helpers & constants
├── docker-compose.yml
├── data_seed.sql
├── .gitignore
└── README.md
```

---

## 👥 Team

| Name | GitHub | Role |
|---|---|---|
| **Mustapha ELMIFDALI** | [@Mustapha-ELMIFDALI](https://github.com/Mustapha-ELMIFDALI) | Project Lead · Backend · Auth · AI · DevOps |
| **Hicham Ouaouache** | [@hichamouaouche](https://github.com/hichamouaouche) | Backend · Frontend |
| **Ilyas Moussaoui** | [@moussIlyas](https://github.com/moussIlyas) | Backend · Frontend · Testing |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
Made with ❤️ in Morocco &nbsp;·&nbsp; ENSET Mohammedia 2026
</div>
