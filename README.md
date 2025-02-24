# Task Management System

## Overview
The **Task Management System** is a full-stack application built using **Spring Boot** for the backend and **React.js** for the frontend, with **MongoDB Atlas** as the database. This application provides a structured way to manage tasks for employees, with role-based access control for **Admins** and **Employees**.

## Features
### Backend (Spring Boot)
- **Task Management:** Employees can create, update, and delete tasks. Each task has a **due date** (default: 7 days).
- **User Roles:** Two roles – **Admin** and **Employee**.
  - **Admin Capabilities:**
    - Create new employee entries.
    - Promote an employee to admin.
    - View the list of all employees and their ongoing tasks.
  - **Employee Capabilities:**
    - Manage personal tasks.
    - View assigned tasks.
- **Security:**
  - Implemented **JWT authentication**.
  - **Spring Security** with role-based authorization.
  - Passwords hashed using **BCrypt**.
- **Logging:**
  - **Logback.xml** configuration for logging.
  - Stores up to **10 log files** to keep track of system activity.

### Frontend (React.js)
- **Authentication & Authorization:**
  - Stores JWT and user role in **local storage**. *(Preferably stored in cookies for better security)*
  - Utilizes **AuthContext** for state management.
  - Protected routes to prevent unauthorized access (Employees can't access Admin features).
- **Dashboard:**
  - **Admin Dashboard:** Shows a list of employees and their tasks.
  - **Employee Dashboard:** Provides access to personal task management.
- **Task Management Panel:**
  - Allows employees to create, update, and delete tasks.
  - Admins can oversee all ongoing tasks.
- **Additional Sections:**
  - **Home Page** - Serves as the landing page with an introduction to the application.
  - **About Section** - Provides details about the system, its purpose, and functionalities.
  - **Contact Us Page** - Includes information for reaching out for support or inquiries.

## Tech Stack
### Backend:
- **Java Spring Boot**
- **Spring Security & JWT Authentication**
- **MongoDB Atlas** (NoSQL database)
- **Logback.xml** (for logging management)
- **BCrypt** (for password hashing)

### Frontend:
- **React.js**
- **Context API (AuthContext)**
- **React Router (Protected Routes)**
- **Bootstrap/Styled Components** (for UI styling)

## Installation & Setup
### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Arpit65-sys/Task-Manager-Full-Stack-Project.git
   cd task-manager-backend
   ```
2. Configure `application.properties`:
   ```properties
   spring.data.mongodb.uri=<your-mongo-db-uri>
   jwt.secret=<your-secret-key>
   ```
3. Run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```
   or use main file to run it

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd task-manager-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm run dev
   ```

## Security & Authorization
- **JWT Authentication:** Protects API endpoints.
- **BCrypt:** Encrypts passwords before storing.
- **Role-Based Access Control:**
  - **Admin** can manage employees and tasks.
  - **Employee** can only manage their tasks.
- **Frontend Protected Routes:** Ensures only authorized users can access respective dashboards.

## Future Enhancements
- Integrate Redis for caching.
- Implement email notifications for task due dates.
- Improve UI with Material-UI or Tailwind CSS.

## License
This project is licensed under the MIT License.
