import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Admin marks attendance
export const markAttendance = async (req, res) => {
  const { employeeId, date, status } = req.body;

  try {
    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date: new Date(date),
        status,
      },
    });

    res.status(201).json({
      success: true,
      data: attendance,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark attendance",
      error: error.message,
    });
  }
};

// Employee fetches their own attendance
export const getAttendanceByEmployee = async (req, res) => {
  const employeeId = req.user.id; // From JWT token

  try {
    const attendance = await prisma.attendance.findMany({
      where: { employeeId },
    });

    res.status(200).json({
      success: true,
      data: attendance,
      message: "Attendance records fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance records",
      error: error.message,
    });
  }
};

// Admin fetches all attendance
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany();

    res.status(200).json({
      success: true,
      data: attendance,
      message: "All attendance records fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching all attendance records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all attendance records",
      error: error.message,
    });
  }
};
