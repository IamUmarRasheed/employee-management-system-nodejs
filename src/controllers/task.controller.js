import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prismaClient.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { employeeId, title, description, dueDate } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        employeeId,
        title,
        description,
        dueDate: new Date(dueDate),
      },
    });

    res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
});

// Get All Tasks for an Employee
export const getTasksByEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { employeeId: Number(employeeId) },
    });

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for the given employee ID.",
      });
    }

    res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
  } catch (error) {
    console.error("Error fetching tasks for employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
});

// Update Task Status
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status },
    });

    res.status(200).json(new ApiResponse(200, task, "Task status updated successfully"));
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message,
    });
  }
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(taskId) },
    });

    res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
});
