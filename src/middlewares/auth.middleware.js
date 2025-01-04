import jwt from "jsonwebtoken";


// Authentication middleware to verify JWT token
export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];
console.log("authenticate", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decoded", decoded);

    req.user = {
      id: decoded.id,
      role: decoded.role || "EMPLOYEE", 
    };
console.log("requ", req.user);
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
