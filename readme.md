# Student Management System

A full-featured student management system built with Node.js, Express, and MongoDB. The system allows teachers and students to manage student profiles, with different access levels based on roles.

## Link 

- coming soon

## Features

- 🔐 User authentication (Login/Signup)
- 👥 Role-based access control (Teacher/Student)
- 📝 CRUD operations for student profiles
- 📸 Profile photo upload
- 📊 Student details management
- ⬇️ Download student information
- 🎨 Animated UI elements

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Multer (file upload)
  - EJS (templating)
  - Express-session

- **Frontend:**
  - Bootstrap 5
  - Bootstrap Icons
  - Custom CSS animations

## Project Structure

```
├── views/
│   ├── login.ejs
│   ├── signup.ejs
│   ├── studentDetails.ejs
│   └── ...
├── routes/
│   └── auth routes
├── models/
│   └── database schemas
├── uploads/
│   └── student photos
├── public/
│   └── static files
└── server.js
```


## Usage

### Authentication

- `/signup` - Create new account (Teacher/Student)
- `/login` - Login to existing account
- `/logout` - End session

### Student Management

- View all students (Teacher access)
- Add new student details
- Edit student information
- Delete student profiles (Teacher only)
- Download student details

## API Endpoints

### Authentication Routes
- `POST /signup` - Register new user
- `POST /login` - Authenticate user
- `GET /logout` - End session

### Student Routes
- `GET /students` - List all students
- `GET /students/:id` - View specific student
- `POST /add-student` - Create new student
- `PUT /edit-student/:id` - Update student
- `DELETE /delete-student/:id` - Remove student
- `GET /students/download/:id` - Download student details

## Role-Based Access

### Teacher Role
- View all students
- Add/Edit/Delete student profiles
- Download student information

### Student Role
- View own profile
- Edit own details
- Download own information


## Note 

### Made while learning
- I made this application learning nodejs side by side, implemented features as soon as i learnt them..
