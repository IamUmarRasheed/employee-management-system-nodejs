import jwt from "jsonwebtoken";

export const generateToken = (userId,role) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
  }

  return jwt.sign({ id: userId ,role:role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
