import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prismaClient.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate Payroll
export const generatePayroll = asyncHandler(async (req, res) => {
  const { employeeId, baseSalary, bonuses, deductions } = req.body;

  try {
    const totalSalary = baseSalary + (bonuses || 0) - (deductions || 0);

    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        baseSalary,
        bonuses,
        deductions,
        totalSalary,
      },
    });

    res.status(201).json(new ApiResponse(201, payroll, "Payroll generated successfully"));
  } catch (error) {
    console.error("Error generating payroll:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate payroll",
      error: error.message,
    });
  }
});

// Get Payroll by Employee
export const getPayrollByEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  console.log("Received employeeId:", employeeId);

  if (!employeeId) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required.",
    });
  }

  try {
    const payrolls = await prisma.payroll.findMany({
      where: { employeeId: Number(employeeId) },
    });

    if (payrolls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payroll records found for the given employee ID.",
      });
    }

    res.status(200).json(new ApiResponse(200, payrolls, "Payrolls fetched successfully"));
  } catch (error) {
    console.error("Error fetching payroll by employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payroll",
      error: error.message,
    });
  }
});
