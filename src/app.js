import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import route files
import authRouter from "./routes/user.router.js";
import leaveRouter from "./routes/leaves.router.js";
import payrollRouter from "./routes/payroll.router.js";
import reviewRouter from "./routes/review.router.js";
import taskRouter from "./routes/tasks.router.js";
import userRouter from "./routes/user.router.js";
import attendanceRouter from "./routes/attendance.router.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true, 
  })
);

app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser()); 
app.use(express.static("public"));

// Routes
app.use("/api/v1/auth", authRouter); // Authentication routes
app.use("/api/v1/users", userRouter); // User management
app.use("/api/v1/leaves", leaveRouter); // Leave management
app.use("/api/v1/attendances", attendanceRouter); // Attendance tracking
app.use("/api/v1/payroll", payrollRouter); // Payroll management
app.use("/api/v1/reviews", reviewRouter); // Employee reviews
app.use("/api/v1/tasks", taskRouter); // Task management

export { app };
