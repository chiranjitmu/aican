# School Management Application

## Overview

This is a School Management Application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. The application allows for managing classes, teachers, and students, with detailed analytics on class composition and financials.

## Features

- _Class Management_: CRUD operations for class records with a student limit of 60 per class.
- _Teacher Management_: CRUD operations for teacher details, including name, gender, DOB, contact details, salary, and assigned class.
- _Student Management_: CRUD operations for student details, including name, gender, DOB, contact details, fees paid, and assigned class.
- _Analytics_:
  - Class details page showing class name, year, teacher, student list, student fees and a gender breakdown graph.
  - Student Analytics page showing name, gender, dob, contact details, fees, assigned class..
  - Teacher Analytics page shwoing name, gender, dob, contact details, salary, assigned class..
  - Expense analytics page displaying expenses on teachers' salaries and income from students' fees with monthly/yearly views.
- _Pagination_: Pagination for tables handled in the backend.
- _Form Validation_: Validation using yup.

## Demo

- _Netlify Deploy Link_: [School Management App](#)

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
