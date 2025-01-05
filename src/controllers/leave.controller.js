import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prismaClient.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Apply Leave
export const applyLeave = asyncHandler(async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;

  try {
    const leave = await prisma.leave.create({
      data: {
        employeeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: "Pending",
      },
    });

    res.status(201).json(new ApiResponse(201, leave, "Leave applied successfully"));
  } catch (error) {
    console.error("Error applying leave:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply leave",
      error: error.message,
    });
  }
});

// Approve Leave
export const approveLeave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;

  try {
    console.log("Leave approved:", leaveId);

    if (isNaN(leaveId)) {
      return res.status(400).json(new ApiResponse(400, null, "Invalid leaveId format"));
    }

    // Check if the leave request exists
    const leave = await prisma.leave.findUnique({
      where: { id: Number(leaveId) },
    });

    if (!leave) {
      return res.status(404).json(new ApiResponse(404, null, "Leave request not found"));
    }

    // Proceed with the update if the leave exists
    const updatedLeave = await prisma.leave.update({
      where: { id: Number(leaveId) },
      data: { status: "Approved" },
    });

    res.status(200).json(new ApiResponse(200, updatedLeave, "Leave approved successfully"));
  } catch (error) {
    console.error("Error approving leave:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve leave",
      error: error.message,
    });
  }
});

// Get All Leave Requests
export const getAllLeaveRequests = asyncHandler(async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      throw new ApiError(403, "Permission denied.");
    }

    const leaveRequests = await prisma.leave.findMany({
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(new ApiResponse(200, leaveRequests, "All leave requests fetched successfully"));
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leave requests",
      error: error.message,
    });
  }
});
