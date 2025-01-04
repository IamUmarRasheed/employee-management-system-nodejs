import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/token.js";

const prisma = new PrismaClient();

// Register Employee (Create an Employee account)
export const registerEmployee = asyncHandler(async (req, res) => {
    console.log("rigter")
    const { name, email, password, role } = req.body;
  
    // Check if an employee with the same email exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email },
    });
  
    if (existingEmployee) {
      throw new ApiError(400, "Employee already exists with this email.");
    }
  
    
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new employee
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "EMPLOYEE",
      },
    });
    const { password: _, ...employeeWithoutPassword } = newEmployee;
  
    res.status(201).json(new ApiResponse(200, employeeWithoutPassword, "Employee registered successfully"));
  });
  



export const loginEmployee = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
  
    const employee = await prisma.employee.findUnique({
      where: { email },
    });
  
    if (!employee) {
      throw new ApiError(400, "Invalid email or password.");
    }
  
    const isPasswordValid = await bcrypt.compare(password, employee.password);
  
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid email or password.");
    }
  
    const token = generateToken(employee.id);

    const employeeInfo = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };
  
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensures secure cookie in production
    };
  
    res
      .status(200)
      .cookie("accessToken", token, options)
      .json(
        new ApiResponse(200, { user: employeeInfo, token }, "User logged In Successfully")
      );
  });
  


