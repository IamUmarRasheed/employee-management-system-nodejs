import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../utils/prismaClient.js";

// Add Review
export const addReview = asyncHandler(async (req, res) => {
  const { employeeId, review, rating } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: {
        employeeId,
        review,
        rating,
      },
    });

    res.status(201).json(new ApiResponse(201, newReview, "Review added successfully"));
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
});

// Get Reviews for an Employee
export const getReviewsByEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { employeeId: Number(employeeId) },
    });

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for the given employee ID.",
      });
    }

    res.status(200).json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
  } catch (error) {
    console.error("Error fetching reviews for employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
});
