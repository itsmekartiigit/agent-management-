import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token and authenticate user
 * @route Used as middleware on protected routes
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login again.",
      });
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not configured");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded contains userId or id (handle both cases)
    if (!decoded.id && !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token structure",
      });
    }

    // Attach user ID to request
    req.userId = decoded.id || decoded.userId;
    req.user = decoded; // Optional: attach full decoded data

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again",
      });
    }

    // Generic error
    console.error("Auth middleware error:", error.message);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;