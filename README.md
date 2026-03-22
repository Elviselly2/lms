# 🎓 LearnHub LMS (Learning Management System)

A full-stack Learning Management System (LMS) that allows admins to create courses and lessons, and learners to access content and track their progress.

---

## 🚀 Project Overview

LearnHub LMS is a role-based web application designed to simulate a real-world e-learning platform.  

It supports:
- Admin content management (courses & lessons)
- Learner access to structured learning content
- Progress tracking for completed lessons

The system demonstrates modern web development practices including API integration, role-based access control, and responsive UI design.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL (Courses)
- MongoDB (Lessons & Progress)

### Tools
- Docker (for PostgreSQL setup)
- Postman (API testing)

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Role-based access (Admin / Learner)

---

### 👨‍💼 Admin Features
- Create courses
- Add lessons to courses
- Manage content dynamically

---

### 👨‍🎓 Learner Features
- View available courses
- Access lessons per course
- Mark lessons as complete
- Track learning progress

---

### 📊 Progress Tracking
- Displays completed lessons count
- Visual progress bar for user engagement

---

## 🧱 System Architecture

The system follows a modular structure:

- **Auth Service** → Handles login & registration  
- **Course Service (PostgreSQL)** → Stores structured course data  
- **Lesson & Progress Service (MongoDB)** → Handles flexible content  

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Courses
- `GET /api/courses`
- `POST /api/courses`

### Lessons
- `GET /api/lessons/:courseId`
- `POST /api/lessons`

### Progress
- `GET /api/progress/:userId`
- `POST /api/progress`

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <https://github.com/Elviselly2/lms.git>
cd learnhub-lms 

### 2.BACKEND SET UP
```bash
cd backend
npm install
npm run dev

3.FRONTEND set up
```bash
cd backend
npm install
npm run dev

 or 
 ```bash
 docker compose up --build

4. Database Setup
PostgreSQL (Docker)
```bash
docker run --name lms-postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres

Create DATABASE
```Bash
docker exec -it lms-postgres psql -U postgres
CREATE DATABASE lms_db;
```MONGODB
ensure mongodb is running localy
````bash
mongod
Security Considerations
JWT authentication
Role-based access control
Input validation (basic)

🚧 Future Improvements
Integrate full PostgreSQL for users
Add file/image upload for courses
Use Next.js for SSR and performance
Implement protected backend routes (middleware)
Add pagination and search

Key Design Decisions
PostgreSQL used for structured relational data (courses)
MongoDB used for flexible, nested data (lessons & progress)
Component-based frontend for reusability
author

Elvis Otieno
Software Engineer