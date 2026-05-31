import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Authenticate user and return JWT token
 * @route POST /api/login
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if fields are empty
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in environment");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Find user by email (case insensitive)
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Generic message for security
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send success response (exclude password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};