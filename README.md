# 🏋️ Gym Tracker

A full-stack web application built to log, track, and manage your daily workout exercises. This project features a modern React frontend and a robust Spring Boot backend.

---
## ✨ Features

* **Full CRUD Functionality**: Create, Read, Update, and Delete exercises.
* **Dynamic Filtering**: Filter your workout log by day of the week or muscle group.
* **Modern UI**: A clean, beautiful, and responsive user interface built with Tailwind CSS.
* **RESTful API**: A well-structured backend API built on professional programming principles.

---
## 🛠️ Tech Stack

### **Frontend**
* **React** with **TypeScript**
* **Vite** for a fast development experience
* **Tailwind CSS** for styling
* **Lucide React** for icons

### **Backend**
* **Spring Boot** with **Groovy**
* **Spring Data JPA** for database interaction
* **PostgreSQL** for the relational database
* **Gradle** for dependency management

### **Deployment**
* **Frontend**: Vercel
* **Backend**: Docker & Render

---
## 🚀 Getting Started

### **Prerequisites**
* Git
* Java JDK 21
* Node.js & npm
* A running PostgreSQL instance

### **1. Clone the Repository**
```bash
git clone [https://github.com/Tusharnair0/Gym-Tracker.git](https://github.com/Tusharnair0/Gym-Tracker.git)
cd Gym-Tracker
```
## 2. Backend Setup

1. Open the project's root folder in **IntelliJ IDEA**.
2. Create a PostgreSQL database (e.g., `gym_tracker`).
3. Configure your database credentials in: `src/main/resources/application.properties`
4. Run the `GymTrackerApplication` file to start the backend server: `http://localhost:8080`

---

## 3. Frontend Setup

1. Open a new terminal and navigate to the `frontend` sub-folder:
```bash
cd frontend
```
2. Install the necessary packages: 
```bash
npm install
```
3. Start the frontend development server:
```bash
npm run dev
```
4. Open your browser and go to:
```bash
http://localhost:5173
```
---

## 📝 API Endpoints

| Method | Endpoint                   | Description                          |
|--------|----------------------------|--------------------------------------|
| POST   | `/api/exercises`           | Creates a new exercise.              |
| GET    | `/api/exercises`           | Gets all exercises.                  |
| GET    | `/api/exercises?day=...`   | Gets exercises filtered by day.      |
| PUT    | `/api/exercises/{id}`      | Updates an existing exercise by ID.  |
| DELETE | `/api/exercises/{id}`      | Deletes an existing exercise by ID.  |
