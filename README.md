# School Management Application

## Overview
This is a School Management Application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. The application allows for managing classes, teachers, and students, with detailed analytics on class composition and financials.

## Features
- *Class Management*: CRUD operations for class records with a student limit of 60 per class.
- *Teacher Management*: CRUD operations for teacher details, including name, gender, DOB, contact details, salary, and assigned class.
- *Student Management*: CRUD operations for student details, including name, gender, DOB, contact details, fees paid, and assigned class.
- *Analytics*:
  - Class details page showing class name, year, teacher, student list, student fees and a gender breakdown graph.
  - Expense analytics page displaying expenses on teachers' salaries and income from students' fees with monthly/yearly views.
- *Pagination*: Pagination for tables handled in the backend.
- *Form Validation*: Validation using yup.

## Demo
- *Netlify Deploy Link*: [School Management App](#)


## Project Setup

1.  Clone the repository:
   ```bash
   git clone https://github.com/chiranjitmu/aican.git
   ```
2. Install dependency in backend
   ```bash
   cd backend 
   npm install   
   ```
3. Install dependency in frontend
   ```bash
   cd frontend
   npm install   
   ```
4. Env file for backend
```bash
PORT = PORT_NUMBER
SECRET_KEY = JWT_SECRET_KEY
MONGO_URI = MONGODB_URI
```
5. Env file for frontend
```bash
VITE_BACKENDURL = BACKEND_URI
```
6. Start backend and frontend server respectively
```bash
npm run dev
```
