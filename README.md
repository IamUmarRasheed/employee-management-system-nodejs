# Employee Management System
Overview
The Employee Management System allows an admin user to register, manage, and authenticate employees. It features role-based access control with support for multiple roles, such as "Admin" and "Employee."

Features
Admin Authentication: Admins can log in using JWT-based authentication.
Role Management: Admins can register new employees with customizable roles (e.g., "Employee").
Secure Passwords: Passwords are hashed using bcrypt for security.
Role-Based Access: Only admin users can create or modify employee accounts.
Employee Login: Employees can log in to access their information.
Tech Stack
Backend: Node.js, Express.js
Database: Prisma ORM, PostgreSQL
Authentication: JWT (JSON Web Tokens)
Password Hashing: bcrypt
